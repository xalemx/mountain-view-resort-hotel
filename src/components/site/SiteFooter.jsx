import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";
import { BRAND, PROPERTIES } from "@/lib/siteContent";

export default function SiteFooter() {
  const { t, openLanguageChooser } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section py-12">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-primary-foreground/15 pb-8">
          <span className="font-heading text-lg">
            △ {BRAND.name} <span className="text-primary-foreground/60">{t.brandSubtitle}</span>
          </span>
          <span className="font-body text-[11px] uppercase tracking-[0.24em] text-primary-foreground/70">
            {t.place}
          </span>
          <a
            href={BRAND.phoneHref}
            className="text-sm underline decoration-primary-foreground/40 underline-offset-4 transition hover:decoration-primary-foreground"
          >
            {BRAND.phone}
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 font-body text-[11px] uppercase tracking-[0.24em] text-primary-foreground/60">
          <span>{t.footer.rights}</span>
          <div className="flex flex-wrap items-center gap-6">
            {PROPERTIES.map((property) => (
              <Link key={property.id} to={property.path} className="transition hover:text-primary-foreground">
                {property.name}
              </Link>
            ))}
            <Link to="/guide" className="transition hover:text-primary-foreground">
              {t.footer.guide}
            </Link>
            <Link to="/about" className="transition hover:text-primary-foreground">
              {t.footer.about}
            </Link>
            <Link to="/contact" className="transition hover:text-primary-foreground">
              {t.footer.contact}
            </Link>
            <button type="button" onClick={openLanguageChooser} className="transition hover:text-primary-foreground">
              {t.footer.chooseLanguage}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}