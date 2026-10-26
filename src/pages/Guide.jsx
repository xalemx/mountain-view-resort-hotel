import React, { useState } from "react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import AskMountainView from "@/components/site/AskMountainView";
import GuideFilters from "@/components/site/GuideFilters";
import GuidePlaces from "@/components/site/GuidePlaces";
import useGuidePlaces from "@/lib/useGuidePlaces";
import { useLanguage } from "@/lib/LanguageContext";
import { useAnchorHref } from "@/lib/siteNav";
import { usePageSeo } from "@/lib/seo";

export default function Guide() {
  const { t } = useLanguage();
  usePageSeo("guide");
  const anchorHref = useAnchorHref();
  const [tag, setTag] = useState("");
  const { places, status, retry } = useGuidePlaces(tag);

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
            <p key={index} className="text-[15px] leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="font-heading text-2xl text-primary md:text-3xl">{t.guide.placesTitle}</h2>

          <GuideFilters active={tag || "all"} onChange={setTag} />

          <p className="mt-4 max-w-3xl text-xs leading-relaxed text-muted-foreground">{t.guide.conditionsNote}</p>

          <GuidePlaces status={status} places={places} retry={retry} />
        </section>

        <AskMountainView defaultTopic="activities" />

        <section className="mt-20">
          <h2 className="font-heading text-2xl text-primary md:text-3xl">{t.guide.practicalTitle}</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-x-14">
            {t.guide.practical.map((item) => (
              <div key={item.title} className="border-t border-border/70 pt-6">
                <h3 className="font-heading text-lg text-primary">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>

          <a href={anchorHref("#offer")} className="btn-pill mt-12">
            {t.guide.cta}
          </a>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}