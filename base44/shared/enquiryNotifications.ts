import { MAX_LENGTHS, cleanEmail, cleanText } from './enquiryFields.ts';

// One place that decides who the host alert goes to, what it says, and whether
// it was accepted for delivery. Both the workflow-triggered function and the
// retry sweep call this, so an enquiry can never be alerted twice.
export const MAX_NOTIFICATION_ATTEMPTS = 3;
export const MAX_GUEST_CONFIRMATION_ATTEMPTS = 3;
export const NOTIFICATION_WINDOW_DAYS = 7;
// How long one worker may hold an enquiry before another run may take it over.
// Longer than a function can run, so a live send is never taken away from it.
export const SEND_LEASE_MS = 10 * 60 * 1000;

export const PROPERTY_LABELS: Record<string, string> = {
  mountain_view_resort: 'Mountain View Resort',
  mountain_view_inn: 'Hotel Mountain View',
  either: 'Either property',
};

// Every enquiry alert goes to the resort's published contact address: the same
// address the site prints as the way to write to us, so a guest's request always
// lands in the inbox the house reads.
export const ENQUIRY_NOTIFICATION_EMAIL = 'mountainviewresortt@gmail.com';

export async function resolveNotificationRecipient() {
  return { email: ENQUIRY_NOTIFICATION_EMAIL, source: 'resort_contact' };
}

function formatDate(value: string) {
  if (typeof value !== 'string' || !value) return '';
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date);
}

function nightsBetween(arrival: string, departure: string) {
  const from = new Date(`${arrival}T00:00:00Z`);
  const to = new Date(`${departure}T00:00:00Z`);
  const nights = Math.round((to.getTime() - from.getTime()) / 86400000);
  return Number.isFinite(nights) && nights > 0 ? nights : 0;
}

export function buildNotificationVariables(enquiry: any) {
  const adults = Number(enquiry.adults) || 0;
  const children = Number(enquiry.children) || 0;
  const nights = nightsBetween(enquiry.arrival, enquiry.departure);

  const guestName = cleanText(enquiry.guest_name, MAX_LENGTHS.name) || 'A guest';
  const guestEmail = cleanEmail(enquiry.email);
  const phone = cleanText(enquiry.phone, MAX_LENGTHS.phone);
  const phoneDigits = phone.replace(/\D/g, '');
  const childrenAges = cleanText(enquiry.children_ages, MAX_LENGTHS.ages);
  const reference = cleanText(enquiry.reference, 20) || 'Not issued';

  const propertyKey = typeof enquiry.property === 'string' ? enquiry.property : '';
  const propertyLabel = Object.keys(PROPERTY_LABELS).includes(propertyKey)
    ? PROPERTY_LABELS[propertyKey]
    : PROPERTY_LABELS.either;

  // A guest may only want WhatsApp, and give no email at all: the alert then
  // carries the WhatsApp channel as the way to answer.
  const replyMethod = enquiry.reply_method === 'whatsapp' ? 'whatsapp' : 'email';
  const replyLabel =
    replyMethod === 'whatsapp'
      ? `WhatsApp · ${phone || 'no number given'}`
      : `Email · ${guestEmail || 'no address given'}`;
  const replyLink =
    replyMethod === 'whatsapp' && phoneDigits.length >= 7
      ? `https://wa.me/${phoneDigits}`
      : guestEmail
        ? `mailto:${guestEmail}`
        : 'https://mountainviewresort.me';

  const childrenLabel = children
    ? `, ${children} ${children === 1 ? 'child' : 'children'}${childrenAges ? ` (${childrenAges})` : ''}`
    : '';

  return {
    reference_label: reference,
    reply_label: replyLabel,
    reply_link: replyLink,
    reply_button_label: replyMethod === 'whatsapp' ? 'Reply on WhatsApp' : 'Reply by email',
    guest_name: guestName,
    guest_email: guestEmail || 'Not provided',
    property_label: propertyLabel,
    stay_label: [formatDate(enquiry.arrival), formatDate(enquiry.departure)].filter(Boolean).join(' to '),
    nights_label: nights > 0 ? `${nights} ${nights === 1 ? 'night' : 'nights'}` : 'To be confirmed',
    guests_label: `${adults} ${adults === 1 ? 'adult' : 'adults'}${childrenLabel}`,
    phone_label: phone || 'Not provided',
    notes_label: cleanText(enquiry.notes, MAX_LENGTHS.notes) || 'No extra notes',
  };
}

// The two emails keep their own state on the record, under their own fields.
const HOST_FIELDS = {
  status: 'notification_status',
  attempts: 'notification_attempts',
  claim: 'notification_claim_id',
  claimedAt: 'notification_claimed_at',
  error: 'notification_error',
  acceptedAt: 'notified_at',
};

const GUEST_FIELDS = {
  status: 'guest_confirmation_status',
  attempts: 'guest_confirmation_attempts',
  claim: 'guest_confirmation_claim_id',
  claimedAt: 'guest_confirmation_claimed_at',
  error: 'guest_confirmation_error',
  acceptedAt: 'guest_confirmation_at',
};

type SendFields = {
  status: string;
  attempts: string;
  claim: string;
  claimedAt: string;
  error: string;
  acceptedAt: string;
};

async function readEnquiry(base44: any, id: string) {
  return base44.asServiceRole.entities.Enquiry.get(id).catch((error: any) =>
    error && error.status === 404 ? null : Promise.reject(error)
  );
}

// A worker that stopped between claiming and reporting would otherwise leave the
// record marked as being sent for ever, and the enquiry would never be retried.
// Once the lease has run out the unfinished attempt is counted and released.
async function releaseStaleClaim(base44: any, row: any, fields: SendFields) {
  if (row[fields.status] !== 'sending') return;

  const claimedAt = row[fields.claimedAt] ? new Date(row[fields.claimedAt]).getTime() : 0;
  if (Number.isFinite(claimedAt) && claimedAt > Date.now() - SEND_LEASE_MS) return;

  // The status is the guard: a row another worker has already released no longer
  // matches, so its attempt is not counted twice.
  const guard: Record<string, unknown> = { id: row.id, [fields.status]: 'sending' };
  if (row[fields.claim]) guard[fields.claim] = row[fields.claim];

  await base44.asServiceRole.entities.Enquiry.updateMany(
    guard,
    {
      $set: {
        [fields.status]: 'failed',
        [fields.attempts]: (Number(row[fields.attempts]) || 0) + 1,
        [fields.error]: 'The previous attempt did not finish, so it may or may not have arrived.',
      },
    }
  );
}

// Takes the enquiry for this worker, or says why it cannot. The condition is
// applied by the database in one write, so of two workers reaching the same
// record only one leaves its own claim id behind; the other reads back someone
// else's claim and stops without sending anything.
async function claimSend(base44: any, id: string, fields: SendFields, blocked: string[]) {
  const current = await readEnquiry(base44, id);
  if (!current) return { won: false, row: null, reason: 'record_not_found' };

  await releaseStaleClaim(base44, current, fields);

  const claimId = crypto.randomUUID();
  await base44.asServiceRole.entities.Enquiry.updateMany(
    { id, [fields.status]: { $nin: blocked } },
    {
      $set: {
        [fields.status]: 'sending',
        [fields.claim]: claimId,
        [fields.claimedAt]: new Date().toISOString(),
      },
    }
  );

  const claimed = await readEnquiry(base44, id);
  if (!claimed) return { won: false, row: null, reason: 'record_not_found' };
  if (claimed[fields.claim] !== claimId) return { won: false, row: claimed, reason: 'claimed_elsewhere' };

  return { won: true, row: claimed, reason: '' };
}

function outcomePatch(
  fields: SendFields,
  { status, attempts, error, acceptedAt }: {
    status: string;
    attempts: number;
    error: string;
    acceptedAt?: string;
  }
) {
  const patch: Record<string, unknown> = {
    [fields.status]: status,
    [fields.attempts]: attempts,
    [fields.error]: error,
  };
  if (acceptedAt) patch[fields.acceptedAt] = acceptedAt;
  return patch;
}

// Safe to call repeatedly: an enquiry already reported as sent is left alone,
// and one another worker is sending is left to that worker, so a retry can never
// send the host a second alert. "Sent" means the mail service accepted the
// message, never that it reached an inbox.
export async function sendHostNotification(base44: any, enquiry: any) {
  if (!enquiry?.id) return { sent: false, skipped: true, reason: 'record_not_found' };

  if (enquiry.notification_status === 'sent') {
    return {
      sent: false,
      skipped: true,
      reason: 'already_sent',
      recipient: enquiry.notification_recipient || '',
    };
  }

  if ((Number(enquiry.notification_attempts) || 0) >= MAX_NOTIFICATION_ATTEMPTS) {
    return {
      sent: false,
      skipped: true,
      reason: 'attempts_exhausted',
      recipient: enquiry.notification_recipient || '',
    };
  }

  const lease = await claimSend(base44, enquiry.id, HOST_FIELDS, ['sent', 'sending']);
  if (!lease.won) {
    return {
      sent: false,
      skipped: true,
      reason: lease.reason,
      recipient: enquiry.notification_recipient || '',
    };
  }

  const row = lease.row;
  const attempts = Number(row.notification_attempts) || 0;
  if (attempts >= MAX_NOTIFICATION_ATTEMPTS) {
    await base44.asServiceRole.entities.Enquiry.update(
      row.id,
      outcomePatch(HOST_FIELDS, {
        status: 'failed',
        attempts,
        error: row.notification_error || 'No attempts left.',
      })
    );
    return {
      sent: false,
      skipped: true,
      reason: 'attempts_exhausted',
      recipient: row.notification_recipient || '',
    };
  }

  const nextAttempts = attempts + 1;
  const { email: recipient, source } = await resolveNotificationRecipient();

  if (!recipient) {
    await base44.asServiceRole.entities.Enquiry.update(
      row.id,
      outcomePatch(HOST_FIELDS, {
        status: 'failed',
        attempts: nextAttempts,
        error: 'No host notification recipient configured',
      })
    );
    return { sent: false, recipient: '', source, error: 'No host notification recipient configured' };
  }

  try {
    const result = await base44.asServiceRole.integrations.Core.SendEmail({
      to: recipient,
      template_name: 'NewEnquiry',
      variables: buildNotificationVariables(row),
    });

    // A blocked address is reported back as an answer, not as an error thrown.
    // It still means the alert did not go out, so it is never recorded as sent.
    if (result && result.success === false) {
      const refusal = result.reason || 'refused';
      await base44.asServiceRole.entities.Enquiry.update(row.id, {
        ...outcomePatch(HOST_FIELDS, {
          status: 'failed',
          attempts: nextAttempts,
          error: `The mail service did not accept the alert (${refusal}).`,
        }),
        notification_recipient: recipient,
      });
      return { sent: false, recipient, source, attempts: nextAttempts, error: refusal };
    }

    await base44.asServiceRole.entities.Enquiry.update(row.id, {
      ...outcomePatch(HOST_FIELDS, {
        status: 'sent',
        attempts: nextAttempts,
        error: '',
        acceptedAt: new Date().toISOString(),
      }),
      notification_recipient: recipient,
    });
    return { sent: true, recipient, source, attempts: nextAttempts };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await base44.asServiceRole.entities.Enquiry.update(row.id, {
      ...outcomePatch(HOST_FIELDS, { status: 'failed', attempts: nextAttempts, error: message }),
      notification_recipient: recipient,
    });
    return { sent: false, recipient, source, attempts: nextAttempts, error: message };
  }
}

// The guest's own copy of the request. It is written the way the site speaks, so
// it is read in the language the guest chose rather than the language of the
// house: the copy below carries the whole wording, and the template only lays it out.
type GuestCopy = {
  locale: string;
  subject: string;
  headline: string;
  subhead: string;
  footerLink: string;
  replyLine: string;
  eitherProperty: string;
  labels: {
    reference: string;
    property: string;
    arrival: string;
    departure: string;
    adults: string;
    children: string;
  };
};

// {reference} and {name} are filled in below. They are deliberately not the
// template's {{ }} placeholders: one substitution pass only, never two.
const GUEST_COPY: Record<string, GuestCopy> = {
  en: {
    locale: 'en-GB',
    subject: 'We have your request, {reference}',
    headline: 'We have your request',
    subhead: 'Thank you, {name}. Here is a copy of what you sent us on the website.',
    footerLink: 'Open the website',
    replyLine:
      'The host will reply with availability and a proposal for your stay. This is an enquiry, not a confirmed booking.',
    eitherProperty: 'Either property',
    labels: {
      reference: 'Reference',
      property: 'Property',
      arrival: 'Arrival',
      departure: 'Departure',
      adults: 'Adults',
      children: 'Children',
    },
  },
  me: {
    locale: 'cnr',
    subject: 'Primili smo vaš zahtjev, {reference}',
    headline: 'Primili smo vaš zahtjev',
    subhead: 'Hvala, {name}. Ovo je kopija onoga što ste nam poslali preko sajta.',
    footerLink: 'Otvorite sajt',
    replyLine:
      'Domaćin će vam odgovoriti sa slobodnim terminima i ponudom za vaš boravak. Ovo je zahtjev, a ne potvrđena rezervacija.',
    eitherProperty: 'Bilo koji smještaj',
    labels: {
      reference: 'Referenca',
      property: 'Smještaj',
      arrival: 'Dolazak',
      departure: 'Odlazak',
      adults: 'Odrasli',
      children: 'Djeca',
    },
  },
  ru: {
    locale: 'ru-RU',
    subject: 'Мы получили ваш запрос, {reference}',
    headline: 'Мы получили ваш запрос',
    subhead: 'Спасибо, {name}. Это копия того, что вы отправили нам на сайте.',
    footerLink: 'Открыть сайт',
    replyLine:
      'Хозяин ответит вам со свободными датами и предложением на ваш заезд. Это запрос, а не подтверждённое бронирование.',
    eitherProperty: 'Любой вариант',
    labels: {
      reference: 'Номер запроса',
      property: 'Жильё',
      arrival: 'Заезд',
      departure: 'Выезд',
      adults: 'Взрослые',
      children: 'Дети',
    },
  },
  sq: {
    locale: 'sq-AL',
    subject: 'Kërkesa juaj u pranua, {reference}',
    headline: 'Kërkesa juaj u pranua',
    subhead: 'Faleminderit, {name}. Kjo është një kopje e asaj që na dërguat në faqe.',
    footerLink: 'Hapni faqen',
    replyLine:
      "Pritësi do t'ju përgjigjet me disponueshmërinë dhe një propozim për qëndrimin tuaj. Kjo është një kërkesë, jo një rezervim i konfirmuar.",
    eitherProperty: 'Pa preferencë',
    labels: {
      reference: 'Referenca',
      property: 'Qëndrimi',
      arrival: 'Mbërritja',
      departure: 'Nisja',
      adults: 'Të rritur',
      children: 'Fëmijë',
    },
  },
};

function guestCopy(language: unknown): GuestCopy {
  return (typeof language === 'string' && GUEST_COPY[language]) || GUEST_COPY.en;
}

function formatGuestDate(value: unknown, locale: string) {
  if (typeof value !== 'string' || !value) return '';
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function buildGuestConfirmationVariables(enquiry: any) {
  const copy = guestCopy(enquiry?.language);
  const reference = cleanText(enquiry?.reference, 20);
  const guestName = cleanText(enquiry?.guest_name, MAX_LENGTHS.name);
  const firstName = guestName.split(' ')[0] || 'guest';

  const propertyKey = typeof enquiry?.property === 'string' ? enquiry.property : '';
  const property =
    propertyKey === 'either' ? copy.eitherProperty : PROPERTY_LABELS[propertyKey] || copy.eitherProperty;

  const arrival = formatGuestDate(enquiry?.arrival, copy.locale);
  const departure = formatGuestDate(enquiry?.departure, copy.locale);
  const adults = Number(enquiry?.adults) || 0;
  const children = Number(enquiry?.children) || 0;

  return {
    subject: copy.subject.replace('{reference}', reference),
    preview: [reference, arrival, departure].filter(Boolean).join(' · '),
    headline: copy.headline,
    subhead: copy.subhead.replace('{name}', firstName),
    label_reference: copy.labels.reference,
    label_property: copy.labels.property,
    label_arrival: copy.labels.arrival,
    label_departure: copy.labels.departure,
    label_adults: copy.labels.adults,
    label_children: copy.labels.children,
    reference,
    property,
    arrival,
    departure,
    adults: String(adults),
    children: String(children),
    reply_line: copy.replyLine,
    footer_link: copy.footerLink,
  };
}

// A guest who asked to be answered by email, and gave an address, gets one copy
// of their own request: never a second one, and never a promise it was read. The
// outcome is reported rather than thrown, so it cannot take the host alert or the
// saved enquiry down with it. Its state is its own — status, attempts and failure
// reason — so a copy that failed is retried on its own, without touching the
// host alert.
export async function sendGuestConfirmation(base44: any, enquiry: any) {
  if (!enquiry?.id) return { sent: false, skipped: true, reason: 'record_not_found' };

  const to = cleanEmail(enquiry?.email);

  // Nothing to confirm to: the guest asked to be answered on WhatsApp, or left no
  // address. Marked so the retry sweep does not keep revisiting the record.
  if (enquiry.reply_method !== 'email' || !to) {
    const reason = enquiry.reply_method !== 'email' ? 'not_an_email_reply' : 'no_address';
    await base44.asServiceRole.entities.Enquiry.updateMany(
      { id: enquiry.id, guest_confirmation_status: { $nin: ['sent', 'sending', 'skipped'] } },
      { $set: { guest_confirmation_status: 'skipped' } }
    );
    return { sent: false, skipped: true, reason };
  }

  if (enquiry.guest_confirmation_sent === true || enquiry.guest_confirmation_status === 'sent') {
    return { sent: false, skipped: true, reason: 'already_sent', recipient: to };
  }

  if ((Number(enquiry.guest_confirmation_attempts) || 0) >= MAX_GUEST_CONFIRMATION_ATTEMPTS) {
    return { sent: false, skipped: true, reason: 'attempts_exhausted', recipient: to };
  }

  const lease = await claimSend(base44, enquiry.id, GUEST_FIELDS, ['sent', 'sending', 'skipped']);
  if (!lease.won) return { sent: false, skipped: true, reason: lease.reason, recipient: to };

  const row = lease.row;

  // A record written before the guest copy had a state of its own: the flag is
  // what says whether the guest already has it.
  if (row.guest_confirmation_sent === true) {
    await base44.asServiceRole.entities.Enquiry.update(row.id, { guest_confirmation_status: 'sent' });
    return { sent: false, skipped: true, reason: 'already_sent', recipient: to };
  }

  const attempts = Number(row.guest_confirmation_attempts) || 0;
  if (attempts >= MAX_GUEST_CONFIRMATION_ATTEMPTS) {
    await base44.asServiceRole.entities.Enquiry.update(
      row.id,
      outcomePatch(GUEST_FIELDS, {
        status: 'failed',
        attempts,
        error: row.guest_confirmation_error || 'No attempts left.',
      })
    );
    return { sent: false, skipped: true, reason: 'attempts_exhausted', recipient: to };
  }

  const nextAttempts = attempts + 1;

  try {
    const result = await base44.asServiceRole.integrations.Core.SendEmail({
      to,
      template_name: 'GuestEnquiryReceived',
      variables: buildGuestConfirmationVariables(row),
      // The guest's own record of their request: a receipt, not marketing, so it
      // carries no unsubscribe link.
      category: 'transactional',
    });

    // A blocked recipient comes back as a refusal, not as a thrown error.
    if (result && result.success === false) {
      const refusal = result.reason || 'refused';
      await base44.asServiceRole.entities.Enquiry.update(
        row.id,
        outcomePatch(GUEST_FIELDS, {
          status: 'failed',
          attempts: nextAttempts,
          error: `The mail service did not accept the guest copy (${refusal}).`,
        })
      );
      return { sent: false, recipient: to, attempts: nextAttempts, error: refusal };
    }

    await base44.asServiceRole.entities.Enquiry.update(row.id, {
      ...outcomePatch(GUEST_FIELDS, {
        status: 'sent',
        attempts: nextAttempts,
        error: '',
        acceptedAt: new Date().toISOString(),
      }),
      guest_confirmation_sent: true,
    });
    return { sent: true, recipient: to, attempts: nextAttempts };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await base44.asServiceRole.entities.Enquiry.update(
      row.id,
      outcomePatch(GUEST_FIELDS, { status: 'failed', attempts: nextAttempts, error: message })
    );
    return { sent: false, recipient: to, attempts: nextAttempts, error: message };
  }
}