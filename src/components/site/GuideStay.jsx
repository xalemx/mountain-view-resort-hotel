import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";
import { useLocaleNav } from "@/lib/useLocaleNav";
import { guideUi } from "@/lib/guideUi";
import { PROPERTIES } from "@/lib/siteContent";
import { trackEvent } from "@/lib/analytics";

// The end of every guide page: the two houses, one line each, and one clear way
// to ask about a stay. Both are ours, and either one works as a base.
export default function GuideStay({ onEnquire, placeId }) {
  const { language } = useLanguage();
  const { to } = useLocaleNav();
  const u = guideUi(language);

  const notes = {
    mountain_view_resort: u.resortNote,
    mountain_view_inn: u.hotelNote,
  };

  return (
    <section aria-labelledby="where-to-stay" className="mt-16 border-t border-border/70 pt-8">
      <h2 id="where-to-stay" className="font-heading text-xl text-primary">
        {u.accommodationTitle}
      </h2>
      <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">{u.accommodationIntro}</p>

      <ul className="mt-6 space-y-3">
        {PROPERTIES.map((property) => (
          <li key={property.value} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border/70 pb-3">
            <Link
              to={to(property.path)}
              onClick={() => trackEvent("property_card_click", { property: property.id })}
              className="font-heading text-base text-primary underline-offset-4 hover:underline"
            >
              {property.name}
            </Link>
            <span className="text-base leading-relaxed text-muted-foreground">{notes[property.value]}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => {
          trackEvent("guide_activity_enquiry_start", { page: placeId, activity: "stay" });
          onEnquire();
        }}
        className="btn-pill mt-8"
      >
        {u.enquireStay}
      </button>
    </section>
  );
}