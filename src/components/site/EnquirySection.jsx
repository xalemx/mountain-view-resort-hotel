import React from "react";
import EnquiryForm from "@/components/site/EnquiryForm";
import { useLanguage } from "@/lib/LanguageContext";
import { PROPERTIES } from "@/lib/siteContent";

// The offer block from the home page, reused on a property page with its own words.
export default function EnquirySection({ id = "offer", eyebrow, title, text, property }) {
  const { t } = useLanguage();
  // On a house's own page the line to that house is the one to show; the home
  // page speaks for both, so both lines are named there.
  const houses = property ? [property] : PROPERTIES;

  return (
    <section id={id} className="border-t border-border/60 py-20 md:py-28">
      <div className="section grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <p className="eyebrow">{eyebrow || t.offer.eyebrow}</p>
          <h2 className="mt-4 font-heading text-3xl leading-tight text-primary md:text-[2.6rem]">{title || t.offer.title}</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">{text || t.offer.text}</p>

          <p className="mt-5 max-w-md rounded-sm border border-border/70 bg-secondary/40 p-4 text-sm leading-relaxed text-foreground">
            {t.form.notConfirmed}
          </p>

          <ol className="mt-10 space-y-4">
            {t.offer.steps.map((step, index) => (
              <li key={step} className="flex items-start gap-4 border-b border-border/70 pb-4 text-sm text-foreground">
                <span className="font-display text-lg text-primary">{String(index + 1).padStart(2, "0")}</span>
                <span className="pt-1">{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-10 space-y-3">
            {houses.map((house) => (
              <a
                key={house.id}
                href={house.whatsapp}
                target="_blank"
                rel="noopener"
                className="flex flex-wrap items-baseline gap-x-3"
              >
                <span className="font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {house.name}
                </span>
                <span className="font-heading text-lg text-primary underline decoration-border underline-offset-4 transition hover:decoration-primary">
                  {t.offer.whatsapp} · {house.phone} ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        <EnquiryForm />
      </div>
    </section>
  );
}