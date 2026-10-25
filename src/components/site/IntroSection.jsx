import React from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function IntroSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28">
      <div className="section">
        <div className="max-w-3xl">
          <p className="eyebrow">{t.intro.eyebrow}</p>
          <h2 className="mt-4 font-heading text-3xl leading-tight text-primary md:text-[2.6rem]">{t.intro.title}</h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">{t.intro.text}</p>
        </div>
      </div>
    </section>
  );
}