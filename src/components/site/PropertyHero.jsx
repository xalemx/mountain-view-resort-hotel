import React from "react";
import { Image } from "@/components/ui/image";
import { mapsWebUrl, openInMaps } from "@/lib/mapsLink";
import { useLanguage } from "@/lib/LanguageContext";

export default function PropertyHero({ property }) {
  const { t } = useLanguage();
  const copy = t.stays[property.id];

  return (
    <section className="relative isolate overflow-hidden">
      <Image src={property.image} alt={property.name} className="absolute inset-0 -z-10 h-full w-full" />
      <div className="absolute inset-0 -z-10 bg-primary/70" />

      <div className="section flex min-h-[68vh] flex-col justify-end pb-10 pt-24 md:min-h-[74vh]">
        <p className="eyebrow text-primary-foreground/70">{copy.place}</p>
        <h1 className="mt-5 max-w-3xl font-display text-[2.8rem] leading-[0.98] text-primary-foreground md:text-[4.4rem]">
          {property.name}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/85">{copy.description}</p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#property-offer" className="btn-cream">
            {t.stays.cta} ↗
          </a>
          <a
            href={mapsWebUrl(property.mapQuery)}
            onClick={(event) => openInMaps(event, property.mapQuery)}
            target="_blank"
            rel="noopener"
            className="btn-outline-light"
          >
            {t.stays.map}
          </a>
        </div>

        <div className="mt-14 flex items-center justify-between border-t border-primary-foreground/25 pt-5 font-body text-[10px] uppercase tracking-[0.3em] text-primary-foreground/70">
          <span>{property.name}</span>
          <span className="hidden sm:inline">
            {property.number} / {copy.place}
          </span>
        </div>
      </div>
    </section>
  );
}