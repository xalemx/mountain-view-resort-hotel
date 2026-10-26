import React from "react";
import SectionHeading from "@/components/site/SectionHeading";
import { mapsWebUrl, openInMaps } from "@/lib/mapsLink";
import { useLanguage } from "@/lib/LanguageContext";
import { BRAND } from "@/lib/siteContent";

export default function PropertyLocation({ property }) {
  const { t } = useLanguage();
  const copy = t.property[property.id];

  return (
    <section className="border-t border-border/60 bg-secondary/50 py-20 md:py-28">
      <div className="section grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow={t.property.locationEyebrow} title={t.property.locationTitle} />
          <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-foreground">{copy.location}</p>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">{t.plan.faqs[0].answer}</p>

          <a
            href={mapsWebUrl(property.mapQuery)}
            onClick={(event) => openInMaps(event, property.mapQuery)}
            target="_blank"
            rel="noopener"
            className="btn-outline-dark mt-8"
          >
            {t.stays.map} ↗
          </a>
        </div>

        <div className="self-start rounded-sm border border-border/70 bg-card p-6 md:p-8">
          <p className="eyebrow">{property.name}</p>
          <p className="mt-3 font-heading text-xl text-primary">{t.stays[property.id].place}</p>

          <ul className="mt-6 text-sm text-foreground">
            <li className="border-b border-border/70 py-3">
              <a href={BRAND.phoneHref} className="transition hover:text-primary">
                {BRAND.phone}
              </a>
            </li>
            <li className="border-b border-border/70 py-3">
              <a href={BRAND.whatsapp} target="_blank" rel="noopener" className="transition hover:text-primary">
                {t.offer.whatsapp} ↗
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}