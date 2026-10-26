import React from "react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { useLanguage } from "@/lib/LanguageContext";
import { usePageSeo } from "@/lib/seo";

export default function About() {
  const { t } = useLanguage();
  usePageSeo("about");

  return (
    <div id="top" className="min-h-screen bg-background font-body text-foreground">
      <SiteHeader />

      <main className="section py-20 md:py-28">
        <p className="eyebrow">{t.about.eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-heading text-3xl leading-tight text-primary md:text-[2.6rem]">
          {t.about.title}
        </h1>

        <div className="mt-10 max-w-3xl space-y-6">
          {t.about.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`text-[15px] leading-relaxed ${
                index === 0 ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}