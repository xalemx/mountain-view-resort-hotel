import React from "react";

const DECISIONS = [
  { value: "keep_published", label: "Keep the site's wording" },
  { value: "use_listed", label: "Change the site to the listing" },
];

const chosen = (decision) =>
  decision === "keep_published"
    ? "Staying as the site says"
    : decision === "use_listed"
      ? "To be changed to the listing"
      : "Not settled yet";

// Every place the saved listing and the published site do not yet agree.
export default function PropertyFactsList({ facts, onDecide }) {
  if (!facts || facts.length === 0) {
    return (
      <p className="rounded-sm border border-dashed border-border p-6 text-sm text-muted-foreground">
        Nothing is flagged for confirmation on this record.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {facts.map((fact, index) => (
        <li key={`${fact.topic}-${index}`} className="rounded-sm border border-border/70 bg-card p-5">
          <p className="font-heading text-base text-foreground">{fact.topic}</p>

          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            <span className="eyebrow mr-2">Site says</span>
            {fact.published}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            <span className="eyebrow mr-2">Listing says</span>
            {fact.listed}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {DECISIONS.map((decision) => (
              <button
                key={decision.value}
                type="button"
                onClick={() => onDecide(index, fact.decision === decision.value ? "undecided" : decision.value)}
                className={`rounded-sm border px-3 py-2 font-body text-xs transition ${
                  fact.decision === decision.value
                    ? "border-primary bg-secondary/60 text-foreground"
                    : "border-border text-muted-foreground hover:border-primary"
                }`}
              >
                {decision.label}
              </button>
            ))}
            <span className="font-body text-xs text-muted-foreground">{chosen(fact.decision)}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}