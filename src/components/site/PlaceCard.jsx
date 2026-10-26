import React from "react";
import { Image } from "@/components/ui/image";
import { mapsWebUrl, openInMaps } from "@/lib/mapsLink";
import { useLanguage } from "@/lib/LanguageContext";
import { formatMinutes, placeText } from "@/lib/guideContent";

// One place in the guide: the photograph if we have one, the name and
// description in the visitor's language, then the distance, the driving time
// and, only where we know it, the walking time with the point it starts from.
export default function PlaceCard({ place }) {
  const { t, language } = useLanguage();
  const text = placeText(place, language);
  const category = t.guide.categories[place.category];

  const facts = [
    place.distance_km ? `${t.guide.distanceLabel}: ${place.distance_km} km` : null,
    place.drive_minutes ? `${t.guide.driveLabel}: ${formatMinutes(place.drive_minutes, t)}` : null,
    place.walk_minutes
      ? `${t.guide.walkLabel}: ${formatMinutes(place.walk_minutes, t)}${text.walkFrom ? ` · ${text.walkFrom}` : ""}`
      : null,
    text.season ? `${t.guide.seasonLabel}: ${text.season}` : null,
  ].filter(Boolean);

  return (
    <article className="border-t border-border/70 pt-6">
      {place.image ? (
        <Image
          src={place.image}
          alt={text.name}
          quality={75}
          className="mb-6 h-44 w-full rounded-sm md:h-52"
        />
      ) : null}

      {category ? <p className="eyebrow">{category}</p> : null}
      <h3 className="mt-3 font-heading text-xl text-primary">{text.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text.description}</p>

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