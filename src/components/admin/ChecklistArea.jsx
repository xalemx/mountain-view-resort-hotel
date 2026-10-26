import React from "react";
import { isOpen } from "@/lib/confirmationChecklist";

const DECISIONS = [
  { value: "keep_published", label: "Keep the site's wording" },
  { value: "use_listed", label: "Change the site to the listing" },
  { value: "undecided", label: "Decide later" },
];

// One question on the final checklist: what to ask, what the record says, and
// the same two answers the record itself offers.
export default function ChecklistArea({ area, items, number, onDecide }) {
  const open = items.filter(({ fact }) => isOpen(fact)).length;
  const topics = items.map(({ fact }) => fact.topic);
  const settled = items.length > 0 && open === 0;

  return (
    <li className="rounded-sm border border-border/70 bg-card p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-4">
          <span className="font-heading text-lg text-primary">{String(number).padStart(2, "0")}</span>
          <h3 className="max-w-2xl font-heading text-base leading-snug text-foreground">{area.title}</h3>
        </div>
        <span
          className={`rounded-sm border px-3 py-1 font-body text-[11px] uppercase tracking-[0.18em] ${
            settled ? "border-primary bg-secondary/60 text-foreground" : "border-border text-muted-foreground"
          }`}
        >
          {items.length === 0
            ? "Nothing on the record"
            : settled
              ? "Settled"
              : `${open} of ${items.length} to confirm`}
        </span>
      </div>

      <p className="mt-4 max-w-3xl font-body text-sm leading-relaxed text-muted-foreground">{area.ask}</p>

      {items.length > 0 ? (
        <ul className="mt-5 space-y-4 border-t border-border/70 pt-5">
          {items.map(({ fact, index }) => (
            <li key={`${fact.topic}-${index}`}>
              <p className="font-body text-sm text-foreground">{fact.topic}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                <span className="eyebrow mr-2">Site says</span>
                {fact.published}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                <span className="eyebrow mr-2">Listing says</span>
                {fact.listed}
              </p>
            </li>
          ))}
        </ul>
      ) : null}

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        <span className="eyebrow mr-2">Where it shows</span>
        {area.affects}
      </p>

      {items.length > 0 ? (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {DECISIONS.map((decision) => {
            const active = items.every(({ fact }) => (fact.decision || "undecided") === decision.value);
            return (
              <button
                key={decision.value}
                type="button"
                onClick={() => onDecide(topics, decision.value)}
                className={`rounded-sm border px-3 py-2 font-body text-xs transition ${
                  active ? "border-primary bg-secondary/60 text-foreground" : "border-border text-muted-foreground hover:border-primary"
                }`}
              >
                {decision.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </li>
  );
}