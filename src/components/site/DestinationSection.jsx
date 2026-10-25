import React from "react";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/site/SectionHeading";
import { ACTIVITIES, EXPERIENCES, TRAIL_NOTE } from "@/lib/siteContent";

export default function DestinationSection() {
  return (
    <section id="discover" className="bg-secondary/50 py-20 md:py-28">
      <div className="section">
        <SectionHeading
          eyebrow="Beyond the door"
          title="Gusinje & Prokletije"
          aside="The valley is the reason most of our guests come back."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          {EXPERIENCES.map((experience) => (
            <article key={experience.title} className="overflow-hidden rounded-sm bg-card">
              <Image src={experience.image} alt={experience.title} className="h-[280px] w-full md:h-[360px]" />
              <div className="p-6 md:p-8">
                <p className="eyebrow">{experience.tag}</p>
                <h3 className="mt-3 font-heading text-2xl text-primary">{experience.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{experience.text}</p>
                <a href={experience.link} target="_blank" rel="noopener" className="link-quiet mt-6 inline-flex">
                  Open in Maps ↗
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 grid gap-8 border-t border-border/70 pt-10 md:grid-cols-3">
          {ACTIVITIES.map((activity, index) => (
            <article key={activity.title}>
              <span className="font-display text-sm text-muted-foreground">
                {String(index + 1).padStart(2, "0")} /
              </span>
              <h3 className="mt-3 font-heading text-xl text-primary">{activity.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{activity.text}</p>
            </article>
          ))}
        </div>

        <p className="mt-10 max-w-3xl border-l-2 border-primary/30 pl-5 text-sm leading-relaxed text-muted-foreground">
          {TRAIL_NOTE}
        </p>
      </div>
    </section>
  );
}