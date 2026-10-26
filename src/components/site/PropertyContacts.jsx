import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { BRAND, PROPERTIES } from "@/lib/siteContent";

// Where a page speaks for the whole family, both houses are named with the line
// that reaches each one, and the single address they share is given once.
const TONES = {
  light: {
    row: "border-border/70",
    label: "text-muted-foreground",
    link: "text-primary decoration-border hover:decoration-primary",
  },
  dark: {
    row: "border-primary-foreground/15",
    label: "text-primary-foreground/60",
    link: "text-primary-foreground decoration-primary-foreground/40 hover:decoration-primary-foreground",
  },
};

export default function PropertyContacts({ tone = "light", className = "" }) {
  const { t } = useLanguage();
  const styles = TONES[tone] || TONES.light;

  return (
    <div className={className}>
      <ul className="space-y-3 text-sm">
        {PROPERTIES.map((property) => (
          <li
            key={property.id}
            className={`flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 border-b pb-3 ${styles.row}`}
          >
            <span className={`font-body text-[11px] uppercase tracking-[0.2em] ${styles.label}`}>
              {property.name}
            </span>
            <span className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <a
                href={property.phoneHref}
                aria-label={`${t.contact.phone} — ${property.name}`}
                className={`font-heading text-base underline underline-offset-4 transition motion-reduce:transition-none ${styles.link}`}
              >
                {property.phone}
              </a>
              <a
                href={property.whatsapp}
                target="_blank"
                rel="noopener"
                aria-label={`${t.contact.whatsapp} — ${property.name}`}
                className={`font-body text-[11px] uppercase tracking-[0.18em] underline underline-offset-4 transition motion-reduce:transition-none ${styles.link}`}
              >
                {t.contact.whatsapp} ↗
              </a>
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-3 flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 text-sm">
        <span className={`font-body text-[11px] uppercase tracking-[0.2em] ${styles.label}`}>{t.contact.email}</span>
        <a
          href={BRAND.emailHref}
          className={`font-heading text-base underline underline-offset-4 transition motion-reduce:transition-none ${styles.link}`}
        >
          {BRAND.email}
        </a>
      </p>
    </div>
  );
}