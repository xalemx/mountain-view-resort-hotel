import React from "react";
import SectionHeading from "@/components/site/SectionHeading";
import { useLanguage } from "@/lib/LanguageContext";
import { RESORT_FACILITIES } from "@/lib/facilities";

export default function PropertyFacilities({ property }) {
  const { t, language } = useLanguage();
  const items =
    property.id === "resort" ? RESORT_FACILITIES[language] || RESORT_FACILITIES.en : t.stays[property.id].features;

  return (
    <section className="border-t border-border/60 bg-secondary/50 py-20 md:py-28">
      <div className="section">
        <SectionHeading eyebrow={property.name} title={t.property.facilitiesTitle} />

        <ul className="mt-10 grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 border-b border-border/70 pb-3 text-sm text-foreground">
              <span className="text-primary">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}