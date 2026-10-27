import React from "react";
import { useLanguage } from "@/lib/LanguageContext";

// Shortcuts to the parts of a house's page, so nobody has to scroll looking for
// the prices, the accommodation, the photographs, the facilities or the address.
export default function PropertySectionNav() {
  const { t } = useLanguage();

  const sections = [
    { key: "prices", href: "#prices" },
    { key: "rooms", href: "#rooms" },
    { key: "photos", href: "#photos" },
    { key: "facilities", href: "#facilities" },
    { key: "location", href: "#location" },
  ];

  return (
    <div className="border-b border-border/60 bg-secondary/50">
      <div className="section flex flex-wrap items-center gap-2 py-3">
        <span className="font-body text-sm text-muted-foreground">{t.property.sectionsLabel}</span>
        {sections.map((section) => (
          <a
            key={section.key}
            href={section.href}
            className="inline-flex min-h-[44px] items-center rounded-full border border-border bg-background px-4 font-body text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
          >
            {t.property.sections[section.key]}
          </a>
        ))}
      </div>
    </div>
  );
}