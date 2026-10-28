import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import GuideBreadcrumbs from "@/components/site/GuideBreadcrumbs";
import GuideStartFrom from "@/components/site/GuideStartFrom";
import GuideDetails from "@/components/site/GuideDetails";
import GuideServices from "@/components/site/GuideServices";
import GuideRelated from "@/components/site/GuideRelated";
import GuideStay from "@/components/site/GuideStay";
import GuideDraftNotice from "@/components/site/GuideDraftNotice";
import GuideSources from "@/components/site/GuideSources";
import { Image } from "@/components/ui/image";
import PageNotFound from "@/lib/PageNotFound";
import { useLanguage } from "@/lib/LanguageContext";
import { useLocaleNav } from "@/lib/useLocaleNav";
import { useOfferRequest } from "@/lib/OfferRequestContext";
import { usePageSeo } from "@/lib/seo";
import { SEO_IMAGES, socialCrop } from "@/lib/seoCopy";
import { guideUi } from "@/lib/guideUi";
import { placeById } from "@/lib/guideFacts";
import { guidePageCopy } from "@/lib/guidePages";
import { breadcrumbSchema, placeSchema, withGraph } from "@/lib/guideStructuredData";
import { trackEvent } from "@/lib/analytics";
import { PROPERTIES } from "@/lib/siteContent";

// One place in the guide, on its own address, in the language of that address.
//
// Everything on the page comes from the two central files — the facts from
// src/lib/guideFacts.js, the words from src/lib/guidePages.js — so the page is
// complete before the browser has asked the database for anything.
export default function GuidePlace() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const { to } = useLocaleNav();
  const { openOffer } = useOfferRequest();
  const [house, setHouse] = useState("resort");

  const place = placeById(slug);
  const copy = place && !place.hubOnly ? guidePageCopy(place.id, language) : null;
  const u = guideUi(language);

  const breadcrumbs = [
    { name: u.breadcrumbHome, path: to("/") },
    { name: u.breadcrumbGuide, path: to("/guide") },
    { name: copy?.name || "", path: to(`/guide/${slug}`) },
  ];

  usePageSeo({
    title: copy?.title || u.breadcrumbGuide,
    description: copy?.description || "",
    image: socialCrop(place?.image) || SEO_IMAGES.guide,
    type: "article",
    noindex: !place || place.status !== "published",
    jsonLd:
      place && copy
        ? withGraph(
            breadcrumbSchema(breadcrumbs),
            placeSchema({
              name: copy.name,
              description: copy.description,
              image: socialCrop(place.image),
              language,
              path: `/guide/${place.id}`,
            })
          )
        : null,
  });

  useEffect(() => {
    if (place && copy) trackEvent("guide_view", { page: place.id, language });
  }, [place, copy, language]);

  if (!place || !copy) return <PageNotFound />;

  const houseValue = PROPERTIES.find((property) => property.id === house)?.value || PROPERTIES[0].value;
  const askAbout = (activity) => openOffer({ property: houseValue, activity });

  return (
    <div id="top" className="min-h-screen bg-background font-body text-foreground">
      <SiteHeader />

      <main>
        <article className="section py-16 md:py-24">
          <GuideBreadcrumbs items={breadcrumbs} />

          <p className="eyebrow mt-8">{u.breadcrumbGuide}</p>
          <h1 className="mt-4 max-w-3xl font-heading text-3xl leading-tight text-primary md:text-[2.6rem]">
            {copy.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground">{copy.lead}</p>

          {place.status !== "published" ? <GuideDraftNotice missing={copy.missing} /> : null}

          {place.image ? (
            <figure className="mt-10">
              <Image
                src={place.image}
                alt={copy.imageAlt}
                quality={80}
                loading="eager"
                className="h-64 w-full rounded-sm md:h-[26rem]"
              />
            </figure>
          ) : null}

          <div className="mt-10 max-w-2xl space-y-5">
            {copy.intro.map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>

          <GuideStartFrom place={place} onHouseChange={setHouse} />

          <section aria-labelledby="expect-heading" className="mt-12 border-t border-border/70 pt-8">
            <h2 id="expect-heading" className="font-heading text-lg text-primary">
              {u.overviewTitle}
            </h2>
            <ul className="mt-4 max-w-2xl space-y-3">
              {copy.expect.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-relaxed text-muted-foreground">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="getting-there-heading" className="mt-12 border-t border-border/70 pt-8">
            <h2 id="getting-there-heading" className="font-heading text-lg text-primary">
              {u.gettingThereTitle}
            </h2>
            <div className="mt-4 max-w-2xl space-y-4">
              {copy.gettingThere.map((paragraph, index) => (
                <p key={index} className="text-base leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <GuideDetails place={place} />
          <GuideRelated place={place} />

          {place.status === "published" ? <GuideServices placeId={place.id} onAsk={askAbout} /> : null}

          <GuideStay placeId={place.id} onEnquire={() => openOffer({ property: houseValue })} />

          <GuideSources sourceKeys={place.sources} />

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            <Link to={to("/guide")} className="link-quiet">
              ← {u.backToGuide}
            </Link>
            <Link to={to("/guide/three-days-in-gusinje")} className="link-quiet">
              {u.itineraryLink}
            </Link>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}