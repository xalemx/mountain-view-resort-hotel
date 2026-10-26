import React from "react";
import SectionHeading from "@/components/site/SectionHeading";
import { useLanguage } from "@/lib/LanguageContext";

export default function PropertyFacilities({ property }) {
  const { t } = useLanguage();
  const features = t.stays[property.id].features;

  return (
    <section className="border-t border-border/60 bg-secondary/50 py-20 md:py-28">
      <div className="section">
        <SectionHeading eyebrow={property.name} title={t.property.facilitiesTitle} />

        <ul className="mt-10 grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 border-b border-border/70 pb-3 text-sm text-foreground">
              <span className="text-primary">—</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}