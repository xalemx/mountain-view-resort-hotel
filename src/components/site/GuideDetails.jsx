import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { guideExtra, guideUi } from "@/lib/guideUi";

// The practical details we can stand behind, at reading size rather than as tiny
// uppercase facts. Only confirmed values appear; the closing line says plainly
// that anything missing has not been confirmed.
export default function GuideDetails({ place }) {
  const { language } = useLanguage();
  const u = guideUi(language);
  const extra = guideExtra(language);
  const practical = place.practical || {};

  const facilities = (practical.facilities || [])
    .map((key) => {
      if (key === "drinking_water_at_trailhead") return u.facilityWater;
      if (key === "shelter_at_trailhead") return u.facilityShelter;
      if (key === "spring_on_route") return u.facilitySpring;
      return null;
    })
    .filter(Boolean);

  const rows = [
    { label: u.factParking, value: practical.parking },
    { label: u.factRoad, value: practical.roadSurface },
    { label: u.factFacilities, value: facilities.length ? facilities.join(" · ") : null },
    {
      label: u.factSeason,
      value:
        practical.seasonalAccess === "june_to_october"
          ? `${u.seasonJuneOctober}. ${u.seasonSnow}.`
          : practical.seasonalAccess,
    },
    { label: u.factCharge, value: practical.entryCharge },
    { label: u.factCash, value: practical.cashMachine },
  ].filter((row) => row.value);

  return (
    <section aria-labelledby="practical-heading" className="mt-12 border-t border-border/70 pt-8">
      <h2 id="practical-heading" className="font-heading text-lg text-primary">
        {u.practicalTitle}
      </h2>

      {rows.length ? (
        <dl className="mt-5 space-y-3">
          {rows.map((row) => (
            <div key={row.label} className="grid gap-1 sm:grid-cols-[12rem_1fr] sm:gap-6">
              <dt className="text-sm leading-relaxed text-muted-foreground">{row.label}</dt>
              <dd className="text-base leading-relaxed text-foreground">{row.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{extra.notListed}</p>
    </section>
  );
}