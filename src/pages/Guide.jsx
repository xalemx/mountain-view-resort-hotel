import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import GuideFilters from "@/components/site/GuideFilters";
import GuidePlaces from "@/components/site/GuidePlaces";
import { useLanguage } from "@/lib/LanguageContext";
import { useLocaleNav } from "@/lib/useLocaleNav";
import { useOfferRequest } from "@/lib/OfferRequestContext";
import { usePageSeo } from "@/lib/seo";
import { guideUi } from "@/lib/guideUi";
import { ITINERARY_ID, publishedPlaces } from "@/lib/guideFacts";
import { itineraryCopy } from "@/lib/guideItinerary";

const EMPTY_FILTERS = { kind: "", duration: "", difficulty: "" };

export default function Guide() {
  const { t, language } = useLanguage();
  const { to } = useLocaleNav();
  usePageSeo("guide");
  const { openOffer } = useOfferRequest();
  const u = guideUi(language);
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  // Only the places we have written up and checked appear here. A draft is
  // reachable by its own address while it is being finished, never from the list.
  const places = useMemo(() => {
    const list = publishedPlaces();
    return list.filter((place) => {
      if (filters.kind && !place.filters.includes(filters.kind)) return false;
      if (filters.duration && place.duration !== filters.duration) return false;
      if (filters.difficulty && place.difficulty !== filters.difficulty) return false;
      return true;
    });
  }, [filters]);

  return (
    <div id="top" className="min-h-screen bg-background font-body text-foreground">
      <SiteHeader />

      <main className="section py-20 md:py-28">
        <p className="eyebrow">{t.guide.eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-heading text-3xl leading-tight text-primary md:text-[2.6rem]">
          {t.guide.title}
        </h1>

        <div className="mt-8 max-w-3xl space-y-5">
          {t.guide.intro.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="font-heading text-2xl text-primary md:text-3xl">{t.guide.placesTitle}</h2>

          <GuideFilters filters={filters} onChange={setFilters} onReset={() => setFilters(EMPTY_FILTERS)} />

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            {u.resultsCount.replace("{count}", String(places.length))}
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{t.guide.conditionsNote}</p>

          <GuidePlaces places={places} onReset={() => setFilters(EMPTY_FILTERS)} />
        </section>

        <section className="mt-20 border-t border-border/70 pt-8">
          <p className="eyebrow">{u.itineraryEyebrow}</p>
          <h2 className="mt-3 font-heading text-2xl text-primary md:text-3xl">{u.itineraryIntroTitle}</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {itineraryCopy(language).lead}
          </p>
          <Link to={to(`/guide/${ITINERARY_ID}`)} className="link-quiet mt-5 inline-block">
            {u.itineraryLink} →
          </Link>
        </section>

        <section className="mt-20">
          <h2 className="font-heading text-2xl text-primary md:text-3xl">{t.guide.practicalTitle}</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-x-14">
            {t.guide.practical.map((item) => (
              <div key={item.title} className="border-t border-border/70 pt-6">
                <h3 className="font-heading text-lg text-primary">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>

          <button type="button" onClick={() => openOffer()} className="btn-pill mt-12">
            {t.guide.cta}
          </button>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}