import React from "react";
import { Link } from "react-router-dom";
import { PROPERTIES } from "@/lib/siteContent";
import { useLanguage } from "@/lib/LanguageContext";

// The two houses side by side: the one you are reading is filled in, the other
// one is always one tap away.
export default function PropertySwitch({ propertyId }) {
  const { t } = useLanguage();

  return (
    <div className="border-b border-border/60 bg-secondary/50">
      <div className="section flex flex-wrap items-center justify-between gap-4 py-5">
        <span className="font-body text-[11px] uppercase tracking-[0.24em] text-muted-foreground">{t.menu.stays}</span>

        <div className="flex flex-wrap gap-3">
          {PROPERTIES.map((property) => {
            const isCurrent = property.id === propertyId;
            const className = `rounded-full border px-5 py-2.5 font-body text-[11px] uppercase tracking-[0.2em] transition ${
              isCurrent
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
            }`;

            return isCurrent ? (
              <span key={property.id} aria-current="page" className={className}>
                {property.name}
              </span>
            ) : (
              <Link key={property.id} to={property.path} className={className}>
                {property.name} ↗
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}