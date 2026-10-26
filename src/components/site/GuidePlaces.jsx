import React from "react";
import PlaceCard from "@/components/site/PlaceCard";
import { useLanguage } from "@/lib/LanguageContext";
import { LANDSCAPE_PHOTO_CREDIT } from "@/lib/siteContent";

// Every state the list can be in: loading, failed with a retry, empty for the
// chosen filter, or the places themselves.
export default function GuidePlaces({ status, places, retry }) {
  const { t } = useLanguage();

  if (status === "loading") {
    return (
      <div className="mt-8 space-y-6" aria-busy="true">
        <p className="sr-only">{t.guide.loadingLabel}</p>
        {[0, 1].map((row) => (
          <div key={row} className="h-32 animate-pulse rounded-sm bg-secondary/60" />
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mt-8 border-t border-border/70 pt-6">
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{t.guide.errorState}</p>
        <button type="button" onClick={retry} className="btn-pill mt-6">
          {t.guide.retry}
        </button>
      </div>
    );
  }

  if (!places.length) {
    return (
      <div className="mt-8 border-t border-border/70 pt-6">
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{t.guide.emptyState}</p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-x-14">
        {places.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>

      {places.some((place) => place.image) ? (
        <p className="mt-10 text-xs leading-relaxed text-muted-foreground">{LANDSCAPE_PHOTO_CREDIT}</p>
      ) : null}
    </>
  );
}