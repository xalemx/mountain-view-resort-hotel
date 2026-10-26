import React from "react";
import SectionHeading from "@/components/site/SectionHeading";
import PropertiesMap from "@/components/site/PropertiesMap";
import { useLanguage } from "@/lib/LanguageContext";
import { PROPERTIES } from "@/lib/siteContent";
import { mapsWebUrl, openInMaps } from "@/lib/mapsLink";

// Both houses on one map, each with its own labelled direction underneath, so a
// guest can see how the resort and the hotel sit in the valley before writing.
export default function MapSection() {
  const { t } = useLanguage();
  const copy = t.map;

  return (
    <section id="map" className="border-t border-border/60 py-20 md:py-24">
      <div className="section">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} />
        <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">{copy.text}</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
          <div className="overflow-hidden rounded-sm border border-border/70">
            <PropertiesMap labels={copy} />
          </div>

          <div className="space-y-6">
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

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted-foreground">{copy.approximate}</p>
      </div>
    </section>
  );
}