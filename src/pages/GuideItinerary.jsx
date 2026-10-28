import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import GuideBreadcrumbs from "@/components/site/GuideBreadcrumbs";
import GuideStay from "@/components/site/GuideStay";
import GuideSources from "@/components/site/GuideSources";
import { useLanguage } from "@/lib/LanguageContext";
import { useLocaleNav } from "@/lib/useLocaleNav";
import { useOfferRequest } from "@/lib/OfferRequestContext";
import { usePageSeo } from "@/lib/seo";
import { SEO_IMAGES } from "@/lib/seoCopy";
import { guideUi } from "@/lib/guideUi";
import { itineraryCopy } from "@/lib/guideItinerary";
import { ITINERARY_ID, placeById } from "@/lib/guideFacts";
import { guidePageCopy } from "@/lib/guidePages";
import { breadcrumbSchema, itinerarySchema, withGraph } from "@/lib/guideStructuredData";
import { trackEvent } from "@/lib/analytics";

const VERSIONS = ["lighter", "active"];

// Three days, written as two versions of the same plan — one for a few hours out,
// one for walking — with the weather alternative for each day and whether a car
// is needed. Nothing here is a package and nothing is booked.
export default function GuideItinerary() {
  const { language } = useLanguage();
  const { to } = useLocaleNav();
  const { openOffer } = useOfferRequest();
  const [version, setVersion] = useState("lighter");

  const u = guideUi(language);
  const copy = itineraryCopy(language);
  const plan = copy.versions[version];
  const days = plan.days;

  const breadcrumbs = [
    { name: u.breadcrumbHome, path: to("/") },
    { name: u.breadcrumbGuide, path: to("/guide") },
    { name: copy.title, path: to(`/guide/${ITINERARY_ID}`) },
  ];

  const sourceKeys = Array.from(
    new Set(
      VERSIONS.flatMap((key) =>
        copy.versions[key].days.flatMap((day) =>
          day.places.flatMap((id) => placeById(id)?.sources || [])
        )
      )
    )
  );

  usePageSeo({
    title: copy.title,
    description: copy.description,
    image: SEO_IMAGES.guide,
    type: "article",
    jsonLd: withGraph(
      breadcrumbSchema(breadcrumbs),
      itinerarySchema({
        name: copy.title,
        description: copy.description,
        days,
        language,
        path: `/guide/${ITINERARY_ID}`,
      })
    ),
  });

  useEffect(() => {
    trackEvent("guide_view", { page: ITINERARY_ID, language });
  }, [language]);

  return (
    <div id="top" className="min-h-screen bg-background font-body text-foreground">
      <SiteHeader />

      <main>
        <article className="section py-16 md:py-24">
          <GuideBreadcrumbs items={breadcrumbs} />

          <p className="eyebrow mt-8">{copy.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-heading text-3xl leading-tight text-primary md:text-[2.6rem]">
            {copy.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground">{copy.lead}</p>

          <div className="mt-8 max-w-2xl space-y-5">
            {copy.intro.map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>

          <section aria-labelledby="versions-heading" className="mt-12 border-t border-border/70 pt-8">
            <h2 id="versions-heading" className="font-heading text-xl text-primary">
              {u.itineraryIntroTitle}
            </h2>

            <div className="mt-5 flex flex-wrap gap-2" role="group" aria-labelledby="versions-heading">
              {VERSIONS.map((key) => {
                const active = key === version;
                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setVersion(key);
                      trackEvent("guide_version_selected", { version: key, page: ITINERARY_ID });
                    }}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border/70 text-foreground hover:border-primary"
                    }`}
                  >
                    {copy.versions[key].label}
                  </button>
                );
              })}
            </div>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{plan.summary}</p>

            <ol className="mt-8 space-y-8">
              {days.map((day, index) => (
                <li key={day.title} className="border-t border-border/70 pt-6">
                  <p className="eyebrow">{u.dayLabel.replace("{n}", String(index + 1))}</p>
                  <h3 className="mt-2 font-heading text-lg text-primary">{day.title}</h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground">{day.text}</p>

                  {day.places?.length ? (
                    <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                      {day.places.map((id) => {
                        const place = placeById(id);
                        const placeCopy = guidePageCopy(id, language);
                        if (!place || !placeCopy || place.status !== "published") {
                          return placeCopy ? (
                            <span key={id} className="text-sm text-muted-foreground">
                              {placeCopy.name}
                            </span>
                          ) : null;
                        }
                        return (
                          <Link key={id} to={to(`/guide/${id}`)} className="link-quiet text-sm">
                            {placeCopy.name}
                          </Link>
                        );
                      })}
                    </p>
                  ) : null}

                  <dl className="mt-4 max-w-2xl space-y-2">
                    <div className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
                      <dt className="text-sm leading-relaxed text-muted-foreground">{u.weatherLabel}</dt>
                      <dd className="text-base leading-relaxed text-muted-foreground">{day.weather}</dd>
                    </div>
                    <div className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
                      <dt className="text-sm leading-relaxed text-muted-foreground">{u.transportLabel}</dt>
                      <dd className="text-base leading-relaxed text-muted-foreground">{day.transport}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ol>

            <div className="mt-10 max-w-2xl border-t border-border/70 pt-6">
              <h3 className="font-heading text-base text-primary">{u.itineraryNotesTitle}</h3>
              <ul className="mt-3 space-y-3">
                {copy.notes.map((note) => (
                  <li key={note} className="flex gap-3 text-base leading-relaxed text-muted-foreground">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <GuideStay placeId={ITINERARY_ID} onEnquire={() => openOffer()} />

          <GuideSources sourceKeys={sourceKeys} />

          <Link to={to("/guide")} className="link-quiet mt-10 inline-block">
            ← {u.backToGuide}
          </Link>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}