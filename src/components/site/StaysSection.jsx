import React, { useState } from "react";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/site/SectionHeading";
import { useLanguage } from "@/lib/LanguageContext";
import { PROPERTIES } from "@/lib/siteContent";

export default function StaysSection() {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState(PROPERTIES[0].id);
  const active = PROPERTIES.find((property) => property.id === activeId) || PROPERTIES[0];
  const copy = t.stays[active.id];

  return (
    <section id="stays" className="border-t border-border/60 py-20 md:py-28">
      <div className="section">
        <SectionHeading eyebrow={t.stays.eyebrow} title={t.stays.title} aside={t.stays.aside} />

        <div className="mt-10 flex flex-wrap gap-3">
          {PROPERTIES.map((property) => (
            <button
              key={property.id}
              type="button"
              onClick={() => setActiveId(property.id)}
              className={`rounded-full border px-5 py-2.5 font-body text-[11px] uppercase tracking-[0.2em] transition ${
                activeId === property.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {property.name}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <Image src={active.image} alt={active.name} className="h-[340px] w-full rounded-sm md:h-[520px]" />
            <span className="absolute left-5 top-5 rounded-full bg-background/85 px-3 py-1 font-body text-[10px] uppercase tracking-[0.24em] text-primary">
              {copy.place}
            </span>
            <span className="absolute bottom-4 right-6 font-display text-5xl text-background/80">
              {active.number}
            </span>
          </div>

          <div className="flex flex-col justify-center">
            <p className="eyebrow">{copy.place}</p>
            <h3 className="mt-4 font-heading text-3xl text-primary md:text-4xl">{active.name}</h3>
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">{copy.description}</p>

            <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {copy.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 border-b border-border/70 pb-3 text-sm text-foreground">
                  <span className="text-primary">—</span>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a href="#offer" className="btn-pill">
                {t.stays.cta} ↗
              </a>
              <a href={active.map} target="_blank" rel="noopener" className="link-quiet">
                {t.stays.map} ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}