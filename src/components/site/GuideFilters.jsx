import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { GUIDE_FILTERS } from "@/lib/guideContent";

const chipClass = (active) =>
  `rounded-full border px-4 py-2 font-body text-[11px] uppercase tracking-[0.18em] transition ${
    active
      ? "border-primary bg-primary text-primary-foreground"
      : "border-border/70 text-muted-foreground hover:border-primary hover:text-primary"
  }`;

// The tags in the LocalPlace records, so a visitor can ask for the kind of day
// they want: an easy walk, a hike, something with the children, or sightseeing.
export default function GuideFilters({ active, onChange }) {
  const { t } = useLanguage();

  const options = [
    { key: "all", label: t.guide.filters.all },
    ...GUIDE_FILTERS.map((key) => ({ key, label: t.guide.filters[key] })),
  ];

  return (
    <div className="mt-8">
      <p className="font-body text-[11px] uppercase tracking-[0.24em] text-muted-foreground">{t.guide.filterLabel}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.key}
            type="button"
            aria-pressed={active === option.key}
            onClick={() => onChange(option.key === "all" ? "" : option.key)}
            className={chipClass(active === option.key)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}