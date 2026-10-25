import React from "react";
import { mapsWebUrl, openInMaps } from "@/lib/mapsLink";
import { useLanguage } from "@/lib/LanguageContext";

export default function PlaceCard({ place }) {
  const { t } = useLanguage();
  const category = t.guide.categories[place.category];

  const facts = [
    place.distance_km ? `${t.guide.distanceLabel}: ${place.distance_km} km` : null,
    place.drive_minutes ? `${t.guide.driveLabel}: ${place.drive_minutes} min` : null,
    place.best_season ? `${t.guide.seasonLabel}: ${place.best_season}` : null,
  ].filter(Boolean);

  return (
    <article className="border-t border-border/70 pt-6">
      {category ? <p className="eyebrow">{category}</p> : null}
      <h3 className="mt-3 font-heading text-xl text-primary">{place.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{place.description}</p>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
        {facts.map((fact) => (
          <span key={fact} className="font-body text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {fact}
          </span>
        ))}
        {place.map_query ? (
          <a
            href={mapsWebUrl(place.map_query)}
            onClick={(event) => openInMaps(event, place.map_query)}
            target="_blank"
            rel="noopener"
            className="link-quiet"
          >
            {t.guide.mapLink} ↗
          </a>
        ) : null}
      </div>
    </article>
  );
}