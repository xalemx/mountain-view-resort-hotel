import test from "node:test";
import assert from "node:assert/strict";
import { fakeBase44 } from "./fakeBase44.mjs";
import {
  MAX_NOTIFICATION_ATTEMPTS,
  SEND_LEASE_MS,
  buildNotificationVariables,
  sendGuestConfirmation,
  sendHostNotification,
} from "../base44/shared/enquiryNotifications.ts";

const stay = {
  guest_name: "Ana Petrović",
  email: "ana@example.com",
  phone: "+382 68 111 222",
  reply_method: "email",
  language: "en",
  property: "mountain_view_resort",
  arrival: "2027-05-10",
  departure: "2027-05-14",
  adults: 2,
  children: 1,
  children_ages: "6",
  notes: "Arriving late",
  reference: "MV-AAAAAA",
};

test("a new enquiry is alerted once and recorded as accepted", async () => {
  const { base44, store, calls } = fakeBase44({ rows: [{ id: "e1", ...stay }] });

  const result = await sendHostNotification(base44, await base44.asServiceRole.entities.Enquiry.get("e1"));

  assert.equal(result.sent, true);
  assert.equal(calls.sendEmail.length, 1);
  assert.equal(calls.sendEmail[0].to, "mountainviewresortt@gmail.com");
  assert.equal(store.get("e1").notification_status, "sent");
  assert.equal(store.get("e1").notification_attempts, 1);
  assert.ok(store.get("e1").notified_at);
});

test("concurrent retries send the host one alert, not two", async () => {
  const { base44, store, calls } = fakeBase44({ rows: [{ id: "e1", ...stay }] });

  const [first, second] = await Promise.all([
    sendHostNotification(base44, { id: "e1", ...stay }),
    sendHostNotification(base44, { id: "e1", ...stay }),
  ]);

  assert.equal(calls.sendEmail.length, 1, "the mail service must be reached once");
  assert.equal([first, second].filter((outcome) => outcome.sent).length, 1);
  assert.equal(store.get("e1").notification_status, "sent");
});

test("a refused address is not recorded as sent, and is retried later", async () => {
  const { base44, store, calls } = fakeBase44({
    rows: [{ id: "e1", ...stay }],
    sendEmail: () => ({ success: false, reason: "unsubscribed" }),
  });

  const refused = await sendHostNotification(base44, { id: "e1", ...stay });
  assert.equal(refused.sent, false);
  assert.equal(refused.error, "unsubscribed");
  assert.equal(store.get("e1").notification_status, "failed");
  assert.equal(store.get("e1").notification_attempts, 1);
  assert.equal(store.get("e1").notified_at, undefined);
  assert.match(store.get("e1").notification_error, /unsubscribed/);

  // The next sweep reaches the mail service again and this time it is accepted.
  const { base44: healthy, store: healthyStore } = fakeBase44({ rows: [{ id: "e1", ...store.get("e1") }] });
  const retried = await sendHostNotification(healthy, { id: "e1", ...healthyStore.get("e1") });
  assert.equal(retried.sent, true);
  assert.equal(healthyStore.get("e1").notification_attempts, 2);
});

test("a thrown send failure is reported, not swallowed as success", async () => {
  const { base44, store } = fakeBase44({
    rows: [{ id: "e1", ...stay }],
    sendEmail: () => {
      throw new Error("mail service unavailable");
    },
  });

  const result = await sendHostNotification(base44, { id: "e1", ...stay });

  assert.equal(result.sent, false);
  assert.equal(store.get("e1").notification_status, "failed");
  assert.match(store.get("e1").notification_error, /unavailable/);
});

test("an older record with no notification state at all is still alerted", async () => {
  const { base44, store, calls } = fakeBase44({ rows: [{ id: "old", ...stay }] });

  const result = await sendHostNotification(base44, await base44.asServiceRole.entities.Enquiry.get("old"));

  assert.equal(result.sent, true);
  assert.equal(calls.sendEmail.length, 1);
  assert.equal(store.get("old").notification_status, "sent");
  assert.equal(store.get("old").notification_attempts, 1);
});

test("an enquiry already reported as sent is never sent again", async () => {
  const { base44, calls } = fakeBase44({
    rows: [{ id: "e1", ...stay, notification_status: "sent", notification_attempts: 1 }],
  });

  // Read the record the way the sweeps do, so the check is made against the
  // state in the database rather than a caller's stale copy.
  const result = await sendHostNotification(base44, await base44.asServiceRole.entities.Enquiry.get("e1"));

  assert.equal(result.skipped, true);
  assert.equal(result.reason, "already_sent");
  assert.equal(calls.sendEmail.length, 0);
});

test("the attempt cap stops the retries", async () => {
  const { base44, calls } = fakeBase44({
    rows: [{ id: "e1", ...stay, notification_status: "failed", notification_attempts: MAX_NOTIFICATION_ATTEMPTS }],
  });

  const result = await sendHostNotification(base44, { id: "e1", ...stay });

  assert.equal(result.skipped, true);
  assert.equal(result.reason, "attempts_exhausted");
  assert.equal(calls.sendEmail.length, 0);
});

test("a lease left behind by a dead worker is taken over", async () => {
  const longAgo = new Date(Date.now() - SEND_LEASE_MS - 60_000).toISOString();
  const { base44, store, calls } = fakeBase44({
    rows: [
      {
        id: "e1",
        ...stay,
        notification_status: "sending",
        notification_claim_id: "dead-worker",
        notification_claimed_at: longAgo,
        notification_attempts: 0,
      },
    ],
  });

  const result = await sendHostNotification(base44, await base44.asServiceRole.entities.Enquiry.get("e1"));

  assert.equal(result.sent, true, "the unfinished attempt must not block the enquiry for ever");
  assert.equal(calls.sendEmail.length, 1);
  assert.equal(store.get("e1").notification_attempts, 2, "the abandoned attempt is counted");
});

test("a lease another worker is still holding is left alone", async () => {
  const { base44, calls } = fakeBase44({
    rows: [
      {
        id: "e1",
        ...stay,
        notification_status: "sending",
        notification_claim_id: "live-worker",
        notification_claimed_at: new Date().toISOString(),
      },
    ],
  });

  const result = await sendHostNotification(base44, await base44.asServiceRole.entities.Enquiry.get("e1"));

  assert.equal(result.skipped, true);
  assert.equal(result.reason, "claimed_elsewhere");
  assert.equal(calls.sendEmail.length, 0);
});

test("a WhatsApp-only guest gets no email copy, and the sweep stops revisiting them", async () => {
  const { base44, store, calls } = fakeBase44({
    rows: [{ id: "e1", ...stay, reply_method: "whatsapp", email: "" }],
  });

  const result = await sendGuestConfirmation(base44, { id: "e1", ...stay, reply_method: "whatsapp", email: "" });

  assert.equal(result.skipped, true);
  assert.equal(result.reason, "not_an_email_reply");
  assert.equal(calls.sendEmail.length, 0);
  assert.equal(store.get("e1").guest_confirmation_status, "skipped");
});

test("an older record already carrying the guest flag is never emailed twice", async () => {
  const { base44, store, calls } = fakeBase44({
    rows: [{ id: "old", ...stay, guest_confirmation_sent: true }],
  });

  const result = await sendGuestConfirmation(base44, await base44.asServiceRole.entities.Enquiry.get("old"));

  assert.equal(result.skipped, true);
  assert.equal(result.reason, "already_sent");
  assert.equal(calls.sendEmail.length, 0, "the flag on the old record is what protects the guest");
  assert.equal(store.get("old").guest_confirmation_sent, true);

  // And it stays protected on the next sweep, too.
  const again = await sendGuestConfirmation(base44, await base44.asServiceRole.entities.Enquiry.get("old"));
  assert.equal(again.skipped, true);
  assert.equal(calls.sendEmail.length, 0);
});

test("guest input is flattened before it reaches an email", () => {
  const variables = buildNotificationVariables({
    ...stay,
    guest_name: "<script>alert(1)</script>Ana",
    notes: "line one\nline two",
  });

  assert.equal(variables.guest_name.includes("<"), false);
  assert.equal(variables.guest_name.includes(">"), false);
  assert.equal(variables.notes_label.includes("\n"), false);
});