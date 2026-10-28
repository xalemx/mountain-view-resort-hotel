import React from "react";
import { Image } from "@/components/ui/image";
import { mapsWebUrl, openInMaps } from "@/lib/mapsLink";
import { useLanguage } from "@/lib/LanguageContext";
import { useOfferRequest } from "@/lib/OfferRequestContext";

// The opening of a house's own page: what it is, and the three things a guest
// wants from here — its prices, a request for it, and the way to it on a map.
export default function PropertyHero({ property }) {
  const { t } = useLanguage();
  const { openOffer } = useOfferRequest();
  const copy = t.stays[property.id];

  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={property.image}
        alt={property.name}
        loading="eager"
        fetchpriority="high"
        className="absolute inset-0 -z-10 h-full w-full"
      />
      <div className="absolute inset-0 -z-10 bg-primary/72" />

      <div className="section flex min-h-[52vh] flex-col justify-end pb-10 pt-20 md:min-h-[56vh]">
        <p className="eyebrow text-primary-foreground/75">{copy.place}</p>
        <h1 className="mt-4 max-w-3xl font-display text-[2.4rem] leading-[0.98] text-primary-foreground md:text-[3.8rem]">
          {property.name}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground md:text-lg">
          {copy.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href="#prices" className="btn-cream">
            {t.property.sections.prices}
          </a>
          <button
            type="button"
            onClick={() => openOffer({ property: property.value })}
            className="btn-outline-light"
          >
            {t.stays.cta}
          </button>
        </div>

        <p className="mt-5">
          <a
            href={mapsWebUrl(property.mapQuery)}
            onClick={(event) => openInMaps(event, property.mapQuery)}
            target="_blank"
            rel="noopener"
            className="font-body text-sm font-medium text-primary-foreground underline decoration-primary-foreground/50 underline-offset-4 transition hover:decoration-primary-foreground"
          >
            {t.stays.map} ↗
          </a>
        </p>
      </div>
    </section>
  );
}