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

const NAV_CLASS =
  "font-body text-sm font-medium text-[#F8F6F2] transition hover:text-[#D5A24A]";

export default function SiteHeader() {
  const { t, language } = useLanguage();
  const { switchLanguage, to } = useLocaleNav();
  const anchorHref = useAnchorHref();
  const { openOffer } = useOfferRequest();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#31584c] bg-[#173B32] text-[#F8F6F2] shadow-[0_8px_20px_rgba(23,59,50,0.18)]">
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
              className="min-h-[44px] max-w-[8rem] rounded-full border border-[#31584c] bg-[#173B32] px-2.5 py-2 font-body text-sm text-[#F8F6F2] outline-none transition hover:border-[#D5A24A] sm:max-w-[10.5rem] sm:px-3"
            >
              {LANGUAGES.map((entry) => (
                <option key={entry.code} value={entry.code} className="bg-[#173B32] text-[#F8F6F2]">
                  {entry.label}
                </option>
              ))}
            </select>

            <MobileNavMenu />

            <button
              type="button"
              onClick={() => openOffer()}
              className="hidden min-h-[44px] items-center justify-center rounded-full bg-[#D5A24A] px-5 py-2.5 font-body text-sm font-semibold text-[#173B32] transition hover:bg-[#e0b45f] sm:inline-flex"
            >
              {t.nav.offer}
            </button>
          </div>
        </div>
      </header>

      <MobileActionBar />
    </>
  );
}