import React from "react";
import EnquiryForm from "@/components/site/EnquiryForm";
import { useLanguage } from "@/lib/LanguageContext";
import { BRAND } from "@/lib/siteContent";

export default function EnquirySection() {
  const { t } = useLanguage();

  return (
    <section id="offer" className="border-t border-border/60 py-20 md:py-28">
      <div className="section grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <p className="eyebrow">{t.offer.eyebrow}</p>
          <h2 className="mt-4 font-heading text-3xl leading-tight text-primary md:text-[2.6rem]">{t.offer.title}</h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">{t.offer.text}</p>

          <ol className="mt-10 space-y-4">
            {t.offer.steps.map((step, index) => (
              <li key={step} className="flex items-start gap-4 border-b border-border/70 pb-4 text-sm text-foreground">
                <span className="font-display text-lg text-primary">{String(index + 1).padStart(2, "0")}</span>
                <span className="pt-1">{step}</span>
              </li>
            ))}
          </ol>

          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener"
            className="mt-10 inline-flex font-heading text-lg text-primary underline decoration-border underline-offset-4 transition hover:decoration-primary"
          >
            {t.offer.whatsapp} · {BRAND.phone} ↗
          </a>
        </div>

        <EnquiryForm />
      </div>
    </section>
  );
}