import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/site/SectionHeading";
import { useLanguage } from "@/lib/LanguageContext";
import { useLocaleNav } from "@/lib/useLocaleNav";
import { PROPERTIES } from "@/lib/siteContent";

// Both houses are always in view — side by side on a wide screen, stacked on a
// phone — so neither is hidden behind a tab. Each card carries its photograph,
// its place, a short description, and the two ways in: the house itself, and its
// prices.
export default function StaysSection() {
  const { t } = useLanguage();
  const { to } = useLocaleNav();

  return (
    <section id="stays" className="border-t border-border/60 py-16 md:py-24">
      <div className="section">
        <SectionHeading eyebrow={t.stays.eyebrow} title={t.stays.title} aside={t.stays.aside} />

        <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-10">
          {PROPERTIES.map((property) => {
            const copy = t.stays[property.id];

            return (
              <article
                key={property.id}
                className="flex flex-col overflow-hidden rounded-sm border border-border/70 bg-card"
              >
                <Image
                  src={property.image}
                  alt={property.name}
                  loading="lazy"
                  className="h-56 w-full md:h-64"
                />

                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <p className="font-body text-sm font-medium text-muted-foreground">{copy.place}</p>
                  <h3 className="mt-2 font-heading text-2xl text-primary md:text-3xl">{property.name}</h3>
                  <p className="mt-4 flex-1 text-base leading-relaxed text-foreground">{copy.description}</p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link to={to(property.path)} className="btn-pill">
                      {t.stays.viewProperty}
                    </Link>
                    <Link to={`${to(property.path)}#prices`} className="btn-outline-dark">
                      {t.stays.viewPrices}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}