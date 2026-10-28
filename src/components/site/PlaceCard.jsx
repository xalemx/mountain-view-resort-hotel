import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/LanguageContext";
import { useLocaleNav } from "@/lib/useLocaleNav";
import { guideUi } from "@/lib/guideUi";
import { guidePageCopy } from "@/lib/guidePages";
import { LANDSCAPE_PHOTO_CREDIT } from "@/lib/siteContent";
import { trackEvent } from "@/lib/analytics";

const DURATION_LABELS = { short: "durationShort", half_day: "durationHalfDay", full_day: "durationFullDay" };
const DIFFICULTY_LABELS = { easy: "difficultyEasy", moderate: "difficultyModerate", demanding: "difficultyDemanding" };

// One place in the guide: the photograph if we have one, the name and the opening
// line, then how long it takes and how hard it is — marked as our own planning
// suggestion unless the route grade came from a published source.
export default function PlaceCard({ place }) {
  const { language } = useLanguage();
  const { to } = useLocaleNav();
  const u = guideUi(language);
  const copy = guidePageCopy(place.id, language);

  if (!copy) return null;

  const facts = [
    `${u.duration}: ${u[DURATION_LABELS[place.duration]] || ""}`,
    `${u.filtersDifficulty}: ${u[DIFFICULTY_LABELS[place.difficulty]] || ""} · ${
      place.difficultyBasis === "published" ? u.sourcedGrade : u.estimate
    }`,
  ];

  return (
    <article className="border-t border-border/70 pt-6">
      {place.image ? (
        <Link to={to(`/guide/${place.id}`)} aria-hidden="true" tabIndex={-1}>
          <Image src={place.image} alt={copy.imageAlt} quality={75} className="mb-6 h-44 w-full rounded-sm md:h-52" />
        </Link>
      ) : null}

      <h3 className="font-heading text-xl text-primary">
        <Link
          to={to(`/guide/${place.id}`)}
          onClick={() => trackEvent("guide_card_click", { page: place.id })}
          className="underline-offset-4 hover:underline"
        >
          {copy.name}
        </Link>
      </h3>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">{copy.lead}</p>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm leading-relaxed text-muted-foreground">
        {facts.map((fact) => (
          <span key={fact}>{fact}</span>
        ))}
      </div>

      <Link to={to(`/guide/${place.id}`)} className="link-quiet mt-4 inline-block text-sm">
        {u.readMore} →
      </Link>
    </article>
  );
}