import React from "react";
import SectionHeading from "@/components/site/SectionHeading";
import { useLanguage } from "@/lib/LanguageContext";
import { PROPERTIES } from "@/lib/siteContent";
import { mapsWebUrl, openInMaps } from "@/lib/mapsLink";

// Where both houses sit, each with its own address and a directions link that
// opens the guest's own map app on a phone.
export default function MapSection() {
  const { t } = useLanguage();
  const copy = t.map;

  return (
    <section id="map" className="border-t border-border/60 py-20 md:py-24">
      <div className="section">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} />
        <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">{copy.text}</p>

        <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-12">
          {PROPERTIES.map((property) => (
            <div key={property.id} className="border-t border-border/70 pt-5">
              <p className="eyebrow">
                {property.number} · {property.name}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground">{copy.directions[property.id]}</p>
              <a
                href={mapsWebUrl(property.mapQuery)}
                onClick={(event) => openInMaps(event, property.mapQuery)}
                target="_blank"
                rel="noopener"
                className="link-quiet mt-3 inline-flex"
              >
                {copy.link} ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}