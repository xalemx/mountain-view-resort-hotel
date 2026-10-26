import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/LanguageContext";
import { useLocaleNav } from "@/lib/useLocaleNav";
import { MENU_PATH, RESTAURANT_COPY } from "@/lib/menu";
import { IMAGES } from "@/lib/siteContent";

// The resort's restaurant, announced on the resort's own page with the way in to
// the menu. The hotel has no restaurant, so this never appears on its page.
export default function RestaurantTeaser() {
  const { language } = useLanguage();
  const { to } = useLocaleNav();
  const copy = RESTAURANT_COPY[language] || RESTAURANT_COPY.en;

  return (
    <section id="restaurant" className="border-t border-border/60 bg-secondary/40 py-20 md:py-28">
      <div className="section grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="mt-4 font-heading text-3xl leading-tight text-primary md:text-[2.4rem]">{copy.title}</h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-foreground">{copy.intro}</p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{copy.breakfastNote}</p>

          <Link to={to(MENU_PATH)} className="btn-pill mt-8 px-8">
            {copy.viewMenu} ↗
          </Link>
        </div>

        <Image
          src={IMAGES.resort}
          alt={copy.title}
          fittingType="fill"
          loading="lazy"
          className="aspect-[4/3] w-full rounded-sm border border-border/70"
        />
      </div>
    </section>
  );
}