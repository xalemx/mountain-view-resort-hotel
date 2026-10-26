import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { MENU_PDF_URL, RESTAURANT_COPY } from "@/lib/menu";

// The printed menu as a PDF. Desktop reads it in place; phones, which cannot
// scroll a PDF inside a page reliably, get the button that opens it.
export default function MenuPdf() {
  const { language } = useLanguage();
  const copy = RESTAURANT_COPY[language] || RESTAURANT_COPY.en;

  return (
    <section className="border-t border-border/60 py-20 md:py-28">
      <div className="section">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 className="mt-4 font-heading text-3xl leading-tight text-primary md:text-[2.4rem]">{copy.imagesTitle}</h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{copy.imagesText}</p>

        <a href={MENU_PDF_URL} target="_blank" rel="noopener" className="btn-pill mt-8">
          {copy.openImage} ↗
        </a>

        <iframe
          src={`${MENU_PDF_URL}#view=FitH`}
          title={copy.imagesTitle}
          loading="lazy"
          className="mt-10 hidden h-[80vh] w-full rounded-sm border border-border/70 md:block"
        />
      </div>
    </section>
  );
}