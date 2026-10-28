import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";
import { useLocaleNav } from "@/lib/useLocaleNav";
import { guideUi } from "@/lib/guideUi";
import { relatedPlaces } from "@/lib/guideFacts";
import { guidePageCopy } from "@/lib/guidePages";

// The places that belong to the same outing, named and linked rather than
// described again.
export default function GuideRelated({ place }) {
  const { language } = useLanguage();
  const { to } = useLocaleNav();
  const u = guideUi(language);
  const places = relatedPlaces(place);

  if (!places.length) return null;

  return (
    <section aria-labelledby="related-heading" className="mt-12 border-t border-border/70 pt-8">
      <h2 id="related-heading" className="font-heading text-lg text-primary">
        {u.relatedTitle}
      </h2>

      <ul className="mt-5 space-y-4">
        {places.map((entry) => {
          const copy = guidePageCopy(entry.id, language);
          return (
            <li key={entry.id} className="border-b border-border/70 pb-4">
              <Link
                to={to(`/guide/${entry.id}`)}
                className="font-heading text-base text-primary underline-offset-4 hover:underline"
              >
                {copy?.name || entry.id}
              </Link>
              {copy?.lead ? (
                <p className="mt-1 max-w-2xl text-base leading-relaxed text-muted-foreground">{copy.lead}</p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}