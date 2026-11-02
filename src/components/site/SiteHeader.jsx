import React from "react";
import { Link } from "react-router-dom";
import { BRAND } from "@/lib/siteContent";
import { Image } from "@/components/ui/image";
import { LANGUAGES } from "@/lib/translations";
import { useLanguage } from "@/lib/LanguageContext";
import { NAV_LINKS, useAnchorHref } from "@/lib/siteNav";
import { useOfferRequest } from "@/lib/OfferRequestContext";
import { useLocaleNav } from "@/lib/useLocaleNav";
import MobileNavMenu from "@/components/site/MobileNavMenu";
import MobileActionBar from "@/components/site/MobileActionBar";

const NAV_CLASS = "font-body text-sm font-medium text-foreground transition hover:text-primary";

// The illustrated mark sits where the small triangle used to.
const LOGO_URL =
  "https://media.base44.com/images/public/6add6db1a4366797590573f0/727480162_D493257C-AA94-47C5-AC21-1DDF76443682.png";

export default function SiteHeader() {
  const { t, language } = useLanguage();
  const { switchLanguage, to } = useLocaleNav();
  const anchorHref = useAnchorHref();
  const { openOffer } = useOfferRequest();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur">
        <div className="section flex items-center justify-between gap-4 py-2 md:gap-8 md:py-3">
          <a href={anchorHref("#top")} className="flex min-w-0 items-center gap-4">
            <Image
              src={LOGO_URL}
              alt={BRAND.name}
              fittingType="fit"
              originWidth={1536}
              originHeight={1024}
              className="w-28 flex-none sm:w-40"
            />
          </a>

          <nav aria-label={t.menu.label} className="hidden flex-none items-center gap-7 lg:flex">
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

          <div className="flex flex-none items-center gap-2 md:gap-3 lg:border-l lg:border-border/60 lg:pl-6">
            <select
              aria-label={t.footer.chooseLanguage}
              value={language}
              onChange={(event) => switchLanguage(event.target.value)}
              className="min-h-[44px] max-w-[10.5rem] rounded-full border border-border bg-background px-3 py-2 font-body text-sm text-foreground outline-none transition hover:border-primary"
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