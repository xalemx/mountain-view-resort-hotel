import React from "react";
import { Link } from "react-router-dom";
import { PROPERTIES } from "@/lib/siteContent";
import { useLanguage } from "@/lib/LanguageContext";
import { useLocaleNav } from "@/lib/useLocaleNav";

// The two houses side by side: the one you are reading is filled in, the other
// one is always one tap away.
export default function PropertySwitch({ propertyId }) {
  const { t } = useLanguage();
  const { to } = useLocaleNav();

  return (
    <div className="border-b border-border/60 bg-secondary/50">
      <div className="section flex flex-wrap items-center justify-between gap-4 py-5">
        <span className="font-body text-sm font-medium text-muted-foreground">{t.menu.stays}</span>

        <div className="flex flex-wrap gap-3">
          {PROPERTIES.map((property) => {
            const isCurrent = property.id === propertyId;
            const className = `inline-flex min-h-[44px] items-center rounded-full border px-5 py-2.5 font-body text-sm font-medium transition ${
              isCurrent
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
            }`;

            return isCurrent ? (
              <span key={property.id} aria-current="page" className={className}>
                {property.name}
              </span>
            ) : (
              <Link key={property.id} to={to(property.path)} className={className}>
                {property.name} ↗
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}