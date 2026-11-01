import React from "react";
import { Link } from "react-router-dom";
import { LANGUAGES } from "@/lib/translations";
import { useLanguage } from "@/lib/LanguageContext";
import { NAV_LINKS, useAnchorHref } from "@/lib/siteNav";
import { useOfferRequest } from "@/lib/OfferRequestContext";
import { useLocaleNav } from "@/lib/useLocaleNav";
import MobileNavMenu from "@/components/site/MobileNavMenu";
import MobileActionBar from "@/components/site/MobileActionBar";
import SiteLogo from "@/components/site/SiteLogo";

const NAV_CLASS = "font-body text-sm font-medium text-foreground transition hover:text-primary";

export default function SiteHeader() {
  const { t, language } = useLanguage();
  const { switchLanguage, to } = useLocaleNav();
  const anchorHref = useAnchorHref();
  const { openOffer } = useOfferRequest();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur">
        <div className="section flex items-center justify-between gap-3 py-3 md:py-4">
          <a href={anchorHref("#top")} className="flex min-w-0 items-center">
            <SiteLogo />
          </a>

          <nav aria-label={t.menu.label} className="hidden items-center gap-5 lg:flex xl:gap-7">
            {NAV_LINKS.map((link) =>
              link.path ? (
                <Link key={link.key} to={to(link.path)} className={NAV_CLASS}>
                  {t.nav[link.key]}
                </Link>
              ) : (
                <a key={link.key} href={anchorHref(link.hash)} className={NAV_CLASS}>
                  {t.nav[link.key]}
                </a>
              )
            )}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <select
              aria-label={t.footer.chooseLanguage}
              value={language}
              onChange={(event) => switchLanguage(event.target.value)}
              className="min-h-[44px] max-w-[8rem] rounded-full border border-border bg-background px-2.5 py-2 font-body text-sm text-foreground outline-none transition hover:border-primary sm:max-w-[10.5rem] sm:px-3"
            >
              {LANGUAGES.map((entry) => (
                <option key={entry.code} value={entry.code} className="bg-background text-foreground">
                  {entry.label}
                </option>
              ))}
            </select>

            <MobileNavMenu />

            <button type="button" onClick={() => openOffer()} className="btn-pill hidden sm:inline-flex">
              {t.nav.offer}
            </button>
          </div>
        </div>
      </header>

      <MobileActionBar />
    </>
  );
}