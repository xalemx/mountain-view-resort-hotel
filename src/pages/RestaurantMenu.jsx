import React from "react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import MenuCategories from "@/components/site/MenuCategories";
import MenuGallery from "@/components/site/MenuGallery";
import { useLanguage } from "@/lib/LanguageContext";
import { useLocaleNav } from "@/lib/useLocaleNav";
import { usePageSeo } from "@/lib/seo";
import { propertyById } from "@/lib/propertyDetails";
import { ORIGINAL_MENU_URL, RESTAURANT_COPY } from "@/lib/menu";

// The restaurant and its menu, under Mountain View Resort and nowhere else.
export default function RestaurantMenu() {
  const { language } = useLanguage();
  const { to } = useLocaleNav();
  const copy = RESTAURANT_COPY[language] || RESTAURANT_COPY.en;
  // The restaurant belongs to the resort, so restaurant enquiries go to its line.
  const resort = propertyById("resort");

  usePageSeo("restaurant");

  return (
    <div id="top" className="min-h-screen bg-background font-body text-foreground">
      <SiteHeader />

      <main>
        <section className="bg-primary py-16 text-primary-foreground md:py-24">
          <div className="section">
            <p className="eyebrow text-primary-foreground/60">{copy.eyebrow}</p>
            <h1 className="mt-5 max-w-3xl font-display text-[2.4rem] leading-[1.04] md:text-[3.6rem]">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/85">{copy.intro}</p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/70">{copy.breakfastNote}</p>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-primary-foreground/70">
              {copy.contactNote}{" "}
              <a
                href={resort.whatsapp}
                target="_blank"
                rel="noopener"
                className="underline decoration-primary-foreground/40 underline-offset-4 transition hover:decoration-primary-foreground"
              >
                {copy.contactAction} · {resort.phone} ↗
              </a>
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link to={to("/mountain-view-resort")} className="btn-cream">
                {copy.backToResort} ↗
              </Link>
              <a href={ORIGINAL_MENU_URL} target="_blank" rel="noopener" className="btn-outline-light">
                {copy.originalMenu} ↗
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="section">
            <h2 className="font-heading text-2xl leading-tight text-primary md:text-3xl">{copy.menuHeading}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{copy.where}</p>
            <div className="mt-8">
              <MenuCategories />
            </div>
          </div>
        </section>

        <MenuGallery />
      </main>

      <SiteFooter />
    </div>
  );
}