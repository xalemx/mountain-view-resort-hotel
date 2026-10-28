import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { guideUi } from "@/lib/guideUi";
import { GUIDE_DIFFICULTIES, GUIDE_DURATIONS, GUIDE_FILTERS } from "@/lib/guideFacts";

// The words for each filter value, written out rather than built from the code,
// so nothing is invented at runtime.
const KIND_LABELS = {
  short_visits: "filterShortVisits",
  valley_walks: "filterValleyWalks",
  mountain_hikes: "filterMountainHikes",
  cycling: "filterCycling",
  food_town: "filterFoodTown",
  rainy_day: "filterRainyDay",
};

const DURATION_LABELS = {
  short: "durationShort",
  half_day: "durationHalfDay",
  full_day: "durationFullDay",
};

const DIFFICULTY_LABELS = {
  easy: "difficultyEasy",
  moderate: "difficultyModerate",
  demanding: "difficultyDemanding",
};

const chipClass = (active) =>
  `min-h-[44px] rounded-full border px-4 py-2 font-body text-sm transition ${
    active
      ? "border-primary bg-primary text-primary-foreground"
      : "border-border/70 text-foreground hover:border-primary"
  }`;

function Group({ label, options, value, onSelect }) {
  return (
    <div>
      <p className="font-body text-sm text-muted-foreground">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.key}
            type="button"
            aria-pressed={value === option.key}
            onClick={() => onSelect(value === option.key ? "" : option.key)}
            className={chipClass(value === option.key)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Three questions a guest actually asks: what kind of outing, how long, and how
// hard. Choosing the same value twice clears it.
export default function GuideFilters({ filters, onChange, onReset }) {
  const { language } = useLanguage();
  const u = guideUi(language);

  const kind = GUIDE_FILTERS.map((key) => ({ key, label: u[KIND_LABELS[key]] }));
  const duration = GUIDE_DURATIONS.map((key) => ({ key, label: u[DURATION_LABELS[key]] }));
  const difficulty = GUIDE_DIFFICULTIES.map((key) => ({ key, label: u[DIFFICULTY_LABELS[key]] }));

  const active = filters.kind || filters.duration || filters.difficulty;

  return (
    <div className="mt-8 space-y-6">
      <Group
        label={u.filtersKind}
        options={kind}
        value={filters.kind}
        onSelect={(value) => onChange({ ...filters, kind: value })}
      />
      <Group
        label={u.filtersDuration}
        options={duration}
        value={filters.duration}
        onSelect={(value) => onChange({ ...filters, duration: value })}
      />
      <Group
        label={u.filtersDifficulty}
        options={difficulty}
        value={filters.difficulty}
        onSelect={(value) => onChange({ ...filters, difficulty: value })}
      />

      {active ? (
        <button type="button" onClick={onReset} className="link-quiet min-h-[44px] text-sm">
          {u.reset}
        </button>
      ) : null}
    </div>
  );
}