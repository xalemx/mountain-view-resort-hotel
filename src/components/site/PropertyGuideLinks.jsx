import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";
import { useLocaleNav } from "@/lib/useLocaleNav";
import { guideUi } from "@/lib/guideUi";
import { placeById } from "@/lib/guideFacts";
import { guidePageCopy } from "@/lib/guidePages";

// The guide, narrowed to the outings that make sense from this house. Draft pages
// are never linked from here.
const PLACE_IDS = {
  resort: ["grebaje-valley", "ropojana-valley", "hrid-lake"],
  inn: ["ali-pasha-springs", "grebaje-valley", "hrid-lake"],
};

export default function PropertyGuideLinks({ property }) {
  const { language } = useLanguage();
  const { to } = useLocaleNav();
  const u = guideUi(language);

  const places = (PLACE_IDS[property.id] || [])
    .map((id) => placeById(id))
    .filter((place) => place && place.status === "published" && !place.hubOnly)
    .map((place) => ({ place, copy: guidePageCopy(place.id, language) }))
    .filter((entry) => entry.copy);

  if (!places.length) return null;

  return (
    <section className="section py-16 md:py-20">
      <div className="border-t border-border/70 pt-8">
        <p className="eyebrow">{u.propertyGuideTitle}</p>
        <h2 className="mt-3 max-w-2xl font-heading text-2xl text-primary md:text-3xl">{u.propertyGuideText}</h2>

        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {places.map(({ place, copy }) => (
            <li key={place.id} className="border-t border-border/70 pt-4">
              <h3 className="font-heading text-lg text-primary">
                <Link to={to(`/guide/${place.id}`)} className="underline-offset-4 hover:underline">
                  {copy.name}
                </Link>
              </h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{copy.lead}</p>
              <Link to={to(`/guide/${place.id}`)} className="link-quiet mt-3 inline-block text-sm">
                {u.openGuide} →
              </Link>
            </li>
          ))}
        </ul>

        <Link to={to("/guide")} className="link-quiet mt-8 inline-block">
          {u.backToGuide} →
        </Link>
      </div>
    </section>
  );
}