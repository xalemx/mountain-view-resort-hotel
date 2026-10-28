import React from "react";
import PlaceCard from "@/components/site/PlaceCard";
import { useLanguage } from "@/lib/LanguageContext";
import { guideUi } from "@/lib/guideUi";
import { LANDSCAPE_PHOTO_CREDIT } from "@/lib/siteContent";

// The places themselves, or — when the filters leave nothing — a plain statement
// of that, with the way back to the whole list.
export default function GuidePlaces({ places, onReset }) {
  const { language } = useLanguage();
  const u = guideUi(language);

  if (!places.length) {
    return (
      <div className="mt-8 border-t border-border/70 pt-6">
        <h3 className="font-heading text-lg text-primary">{u.emptyTitle}</h3>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">{u.emptyText}</p>
        <button type="button" onClick={onReset} className="btn-outline-dark mt-6">
          {u.emptyReset}
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mt-6 grid gap-10 md:grid-cols-2 md:gap-x-14">
        {places.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>

      <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">{u.listNote}</p>

      {places.some((place) => place.image) ? (
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{LANDSCAPE_PHOTO_CREDIT}</p>
      ) : null}
    </>
  );
}