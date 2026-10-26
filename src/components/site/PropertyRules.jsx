import React from "react";
import SectionHeading from "@/components/site/SectionHeading";
import { useLanguage } from "@/lib/LanguageContext";
import { RESORT_HOUSE_RULES } from "@/lib/houseRules";

// The rules the resort is listed with: the times, what is welcome and what is
// not. The note says plainly that they are the listed rules and that the
// conditions for a stay are confirmed with the offer.
export default function PropertyRules({ property }) {
  const { t, language } = useLanguage();
  const content = RESORT_HOUSE_RULES[language] || RESORT_HOUSE_RULES.en;

  return (
    <section className="border-t border-border/60 py-20 md:py-28">
      <div className="section">
        <SectionHeading eyebrow={property.name} title={t.property.rulesTitle} />

        <div className="mt-10 rounded-sm border border-border/70 bg-card p-8">
          <div className="grid gap-3 sm:grid-cols-2">
            <p className="font-heading text-lg text-primary">{content.checkIn}</p>
            <p className="font-heading text-lg text-primary">{content.checkOut}</p>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {content.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                <span className="text-primary">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">{content.note}</p>
        </div>
      </div>
    </section>
  );
}