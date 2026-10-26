import React from "react";
import SectionHeading from "@/components/site/SectionHeading";
import { useLanguage } from "@/lib/LanguageContext";
import { RESORT_ACTIVITIES } from "@/lib/activities";

// The resort's own activities, grouped by what they cost: what comes with the
// stay, what is arranged on request for an extra charge, and what sits off site.
export default function PropertyActivities({ property }) {
  const { t, language } = useLanguage();
  const content = RESORT_ACTIVITIES[language] || RESORT_ACTIVITIES.en;

  return (
    <section className="border-t border-border/60 py-20 md:py-28">
      <div className="section">
        <SectionHeading eyebrow={property.name} title={t.property.activitiesTitle} />

        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {content.groups.map((group) => (
            <div key={group.title}>
              <h3 className="font-heading text-lg leading-snug text-primary">{group.title}</h3>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="text-primary">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">{content.note}</p>
      </div>
    </section>
  );
}