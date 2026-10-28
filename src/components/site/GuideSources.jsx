import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { guideUi } from "@/lib/guideUi";
import { FACTS_CHECKED_ON, GUIDE_SOURCES } from "@/lib/guideFacts";

const LOCALES = { en: "en-GB", me: "sr-Latn-ME", ru: "ru-RU", sq: "sq-AL" };

// Where each fact came from, and the day it was last read. A guide page without
// this is only an opinion.
export default function GuideSources({ sourceKeys }) {
  const { language } = useLanguage();
  const u = guideUi(language);

  const checked = new Intl.DateTimeFormat(LOCALES[language] || LOCALES.en, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${FACTS_CHECKED_ON}T12:00:00Z`));

  const sources = (sourceKeys || []).map((key) => GUIDE_SOURCES[key]).filter(Boolean);

  return (
    <section aria-labelledby="sources-heading" className="mt-12 border-t border-border/70 pt-6">
      <h2 id="sources-heading" className="font-heading text-base text-primary">
        {u.sourcesTitle}
      </h2>
      <ul className="mt-3 space-y-1">
        {sources.map((source) => (
          <li key={source.url} className="text-sm leading-relaxed">
            <a href={source.url} target="_blank" rel="noopener" className="link-quiet">
              {source.label} ↗
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {u.checkedOn}: {checked}
      </p>
    </section>
  );
}