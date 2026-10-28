import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import PropertyRecordFields from "@/components/admin/PropertyRecordFields";
import PropertyFactsList from "@/components/admin/PropertyFactsList";
import ConfirmationChecklist from "@/components/admin/ConfirmationChecklist";

const RESORT = "mountain_view_resort";
const LIST_KEYS = ["room_types", "amenities", "house_rules", "activities", "languages"];

const toForm = (record) => {
  const form = { ...record };
  LIST_KEYS.forEach((key) => {
    form[key] = (record[key] || []).join("\n");
  });
  return form;
};

const toPatch = (form) => {
  const patch = { ...form };
  LIST_KEYS.forEach((key) => {
    patch[key] = String(form[key] || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  });
  return patch;
};

// One central record for the resort: the saved listing snapshot, the places it
// differs from what the site publishes, and the owner's decision on each.
export default function OwnerProperty() {
  const { user, logout } = useAuth();
  const isOwner = user?.role === "admin";

  const [record, setRecord] = useState(null);
  const [form, setForm] = useState(null);
  const [state, setState] = useState("loading");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const page = await base44.entities.PropertyRecord.filter({ property: RESORT }, { sort: "-created_date", limit: 1 });
      const found = page.items[0] || null;
      setRecord(found);
      setForm(found ? toForm(found) : null);
      setState(found ? "ready" : "empty");
    } catch (loadError) {
      setState("error");
    }
  }, []);

  useEffect(() => {
    if (isOwner) load();
  }, [isOwner, load]);

  const change = (key, value) => setForm((previous) => ({ ...previous, [key]: value }));

  const decide = (index, decision) =>
    setForm((previous) => ({
      ...previous,
      facts_to_confirm: (previous.facts_to_confirm || []).map((fact, position) =>
        position === index ? { ...fact, decision } : fact
      ),
    }));

  // One answer on the checklist settles every record item grouped under it.
  const decideArea = (topics, decision) =>
    setForm((previous) => ({
      ...previous,
      facts_to_confirm: (previous.facts_to_confirm || []).map((fact) =>
        topics.includes(fact.topic) ? { ...fact, decision } : fact
      ),
    }));

  const save = async () => {
    setSaving(true);
    try {
      await base44.entities.PropertyRecord.update(record.id, toPatch(form));
      toast({ title: "Record saved" });
      await load();
    } catch (saveError) {
      toast({ title: "Could not save the record", variant: "destructive" });
    }
    setSaving(false);
  };

  const createBlank = async () => {
    try {
      await base44.entities.PropertyRecord.create({
        property: RESORT,
        record_state: "snapshot",
        source: "Booking.com listing",
        captured_on: new Date().toISOString().slice(0, 10),
      });
      toast({ title: "Blank record created" });
      await load();
    } catch (createError) {
      toast({ title: "Could not create the record", variant: "destructive" });
    }
  };

  if (!isOwner) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="w-full max-w-md rounded-sm border border-border bg-card p-8 text-center">
          <p className="eyebrow">Owner area</p>
          <h1 className="mt-2 font-heading text-2xl text-foreground">This page is for the owner</h1>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link to="/" className="link-quiet">
              Back to the website
            </Link>
            <button type="button" onClick={() => logout()} className="link-quiet">
              Sign in as the owner
            </button>
          </div>
        </div>
      </main>
    );
  }

  const facts = form?.facts_to_confirm || [];
  const settled = facts.filter((fact) => fact.decision && fact.decision !== "undecided").length;

  return (
    <main className="min-h-screen bg-background pb-20">
      <header className="border-b border-border bg-card">
        <div className="section flex flex-wrap items-center justify-between gap-4 py-5">
          <div>
            <p className="eyebrow">Mountain View · Owner</p>
            <h1 className="font-heading text-2xl text-foreground">Resort record</h1>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/owner" className="link-quiet">
              Guest enquiries
            </Link>
            <Link to="/" className="link-quiet">
              View website
            </Link>
            <button type="button" onClick={() => logout()} className="link-quiet">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="section py-8">
        {/* Nothing on this page is published. Saying so plainly is the point:
            the difference between a private record and the live website is the
            one thing an owner must not have to guess. */}
        <div className="mb-6 rounded-sm border border-border/70 bg-secondary/40 p-5">
          <p className="eyebrow">Saved here, not on the website</p>
          <p className="mt-2 max-w-3xl font-body text-sm leading-relaxed text-foreground">
            Everything on this page is a private record: the saved listing, your own notes and your decision on each
            difference stay with this record and are never shown to a guest. Saving here does not change the published
            website. What a guest reads — wording, prices, photographs — changes only when the site itself is updated,
            so until that is done the site keeps saying exactly what it says today.
          </p>
        </div>

        {state === "loading" ? (
          <div className="flex items-center gap-3 font-body text-sm text-muted-foreground">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-primary" />
            Loading the record
          </div>
        ) : null}

        {state === "error" ? (
          <div className="rounded-sm border border-destructive/40 bg-destructive/5 p-6">
            <p className="font-body text-sm text-destructive">
              We could not load the record. Please refresh the page.
            </p>
          </div>
        ) : null}

        {state === "empty" ? (
          <div className="rounded-sm border border-dashed border-border p-10 text-center">
            <p className="font-heading text-lg text-foreground">No resort record yet</p>
            <p className="mt-2 font-body text-sm text-muted-foreground">
              Create one and it will hold the saved listing snapshot, ready to compare with the site.
            </p>
            <Button onClick={createBlank} className="mt-6 rounded-sm">
              Create a blank record
            </Button>
          </div>
        ) : null}

        {state === "ready" && form ? (
          <div className="space-y-12">
            <div className="rounded-sm border border-border/70 bg-card p-6">
              <p className="eyebrow">Saved listing snapshot</p>
              <p className="mt-3 max-w-3xl font-body text-sm leading-relaxed text-muted-foreground">
                This is what {form.source || "the listing"} carried on {form.captured_on || "the day it was saved"}, for
                Mountain View Resort only. It is not availability and not pricing, and the public site does not read it
                live: the resort page, the four translations and both assistants keep their published wording until you
                settle an item below.
              </p>
              <p className="mt-3 max-w-3xl font-body text-sm leading-relaxed text-muted-foreground">
                The overall rating, {form.guest_rating || "not captured yet"}, is a Booking.com snapshot taken on{" "}
                {form.captured_on || "the day it was saved"} — not a live figure, never updated here, and never used as
                proof of room capacity or facilities.
              </p>
              {form.source_url ? (
                <a
                  href={form.source_url}
                  target="_blank"
                  rel="noopener"
                  className="link-quiet mt-4 inline-flex"
                >
                  Open the listing ↗
                </a>
              ) : null}
              <Link to="/mountain-view-resort" className="link-quiet mt-4 ml-6 inline-flex">
                See what the resort page says ↗
              </Link>
            </div>

            <section>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="eyebrow">What the listing says</p>
                  <h2 className="mt-2 font-heading text-xl text-foreground">The record</h2>
                </div>
                <Button onClick={save} disabled={saving || state !== "ready"} className="rounded-sm">
                  {saving ? "Saving..." : "Save the record"}
                </Button>
              </div>
              <div className="mt-6">
                <PropertyRecordFields form={form} onChange={change} />
              </div>
            </section>

            <section>
              <p className="eyebrow">Before anything else changes</p>
              <h2 className="mt-2 font-heading text-xl text-foreground">Final confirmation checklist</h2>
              <p className="mt-2 max-w-3xl font-body text-sm leading-relaxed text-muted-foreground">
                Eight questions, and only you can settle them. Each one gathers the items on this record that answer
                it, so you decide once: mark the whole area, save, and we bring the site, the four translations and
                both assistants into line with your answer.
              </p>
              <div className="mt-6">
                <ConfirmationChecklist facts={facts} onDecide={decideArea} />
              </div>
              <div className="mt-6">
                <Button onClick={save} disabled={saving} className="rounded-sm">
                  {saving ? "Saving..." : "Save the record"}
                </Button>
              </div>
            </section>

            <section>
              <p className="eyebrow">The full record, item by item</p>
              <h2 className="mt-2 font-heading text-xl text-foreground">
                {facts.length === 0
                  ? "Nothing flagged"
                  : `${settled} of ${facts.length} settled`}
              </h2>
              <p className="mt-2 max-w-3xl font-body text-sm leading-relaxed text-muted-foreground">
                The checklist above groups these items; here they are one by one. Each is either a place the listing
                and the site disagree, or something the listing says that the site does not say yet. Mark each one, save, and we will bring the resort page, the ME, RU and
                SQ translations, the enquiry wording and both assistants into line.
              </p>
              <div className="mt-6">
                <PropertyFactsList facts={facts} onDecide={decide} />
              </div>
              <div className="mt-6">
                <Button onClick={save} disabled={saving} className="rounded-sm">
                  {saving ? "Saving..." : "Save the record"}
                </Button>
              </div>
            </section>
          </div>
        ) : null}
      </div>
    </main>
  );
}