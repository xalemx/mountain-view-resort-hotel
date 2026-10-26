import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/site/SectionHeading";
import { mapsWebUrl, openInMaps } from "@/lib/mapsLink";
import { useLanguage } from "@/lib/LanguageContext";
import { EXPERIENCES, LANDSCAPE_PHOTO_CREDIT } from "@/lib/siteContent";

export default function DestinationSection() {
  const { t } = useLanguage();

  return (
    <section id="discover" className="bg-secondary/50 py-20 md:py-28">
      <div className="section">
        <SectionHeading eyebrow={t.discover.eyebrow} title={t.discover.title} aside={t.discover.aside} />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          {EXPERIENCES.map((experience) => {
            const copy = t.discover[experience.id];
            return (
              <article key={experience.id} className="overflow-hidden rounded-sm bg-card">
                <Image src={experience.image} alt={copy.name} className="h-[280px] w-full md:h-[360px]" />
                <div className="p-6 md:p-8">
                  <p className="eyebrow">{copy.tag}</p>
                  <h3 className="mt-3 font-heading text-2xl text-primary">{copy.name}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{copy.text}</p>
                  <a
                    href={mapsWebUrl(experience.mapQuery)}
                    onClick={(event) => openInMaps(event, experience.mapQuery)}
                    target="_blank"
                    rel="noopener"
                    className="link-quiet mt-6 inline-flex"
                  >
                    {t.discover.map} ↗
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">{LANDSCAPE_PHOTO_CREDIT}</p>

        <div className="mt-14 grid gap-8 border-t border-border/70 pt-10 md:grid-cols-3">
          {t.discover.activities.map((activity, index) => (
            <article key={activity.title}>
              <span className="font-display text-sm text-muted-foreground">{String(index + 1).padStart(2, "0")} /</span>
              <h3 className="mt-3 font-heading text-xl text-primary">{activity.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{activity.text}</p>
            </article>
          ))}
        </div>

        <p className="mt-10 max-w-3xl border-l-2 border-primary/30 pl-5 text-sm leading-relaxed text-muted-foreground">
          {t.discover.trailNote}
        </p>

        <Link to="/guide" className="link-quiet mt-6 inline-flex">
          {t.guide.title} ↗
        </Link>
      </div>
    </section>
  );
}