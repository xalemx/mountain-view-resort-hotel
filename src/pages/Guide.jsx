import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PlaceCard from "@/components/site/PlaceCard";
import { useLanguage } from "@/lib/LanguageContext";
import { useAnchorHref } from "@/lib/siteNav";

export default function Guide() {
  const { t } = useLanguage();
  const anchorHref = useAnchorHref();
  const [places, setPlaces] = useState(null);

  useEffect(() => {
    let active = true;

    base44.entities.LocalPlace.list({ sort: "sort_order", limit: 50 }).then((page) => {
      if (active) setPlaces(page.items);
    });

    return () => {
      active = false;
    };
  }, []);

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

          {places === null ? (
            <div className="mt-8 space-y-6" aria-hidden="true">
              {[0, 1].map((row) => (
                <div key={row} className="h-32 animate-pulse rounded-sm bg-secondary/60" />
              ))}
            </div>
          ) : (
            <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-x-14">
              {places.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          )}
        </section>

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