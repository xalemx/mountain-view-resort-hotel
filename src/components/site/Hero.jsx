import React from "react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/LanguageContext";
import { BRAND, IMAGES } from "@/lib/siteContent";

// The opening band is deliberately short: the name, one sentence saying what the
// two houses are, and the way further into the page. The two properties are the
// next thing on the screen.
export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={IMAGES.hero}
        alt="The Prokletije mountains above the Grebaje valley"
        loading="eager"
        fetchpriority="high"
        className="absolute inset-0 -z-10 h-full w-full"
      />
      <div className="absolute inset-0 -z-10 bg-primary/70" />

      <div className="section flex min-h-[58vh] flex-col justify-end pb-12 pt-20 md:min-h-[62vh]">
        <p className="eyebrow text-primary-foreground/75">{t.hero.eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-display text-[2.6rem] leading-[0.98] text-primary-foreground md:text-[4.2rem]">
          {BRAND.name}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground md:text-lg">
          {t.hero.intro}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href="#stays" className="btn-cream">
            {t.hero.cta}
          </a>
          <a href="#offer" className="btn-outline-light">
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}