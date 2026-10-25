import React from "react";
import { BRAND } from "@/lib/siteContent";
import { LANGUAGES } from "@/lib/translations";
import { useLanguage } from "@/lib/LanguageContext";
import { useAnchorHref } from "@/lib/siteNav";

export default function SiteHeader() {
  const { t, language, chooseLanguage } = useLanguage();
  const anchorHref = useAnchorHref();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="section flex items-center justify-between gap-4 py-4">
        <a href={anchorHref("#top")} className="flex items-center gap-3">
          <span className="font-display text-2xl leading-none text-primary">△</span>
          <span className="leading-none">
            <span className="block font-heading text-sm uppercase tracking-[0.18em] text-primary">{BRAND.name}</span>
            <span className="mt-1 block font-body text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
              {t.brandSubtitle}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {t.nav.slice(0, 3).map((link) => (
            <a
              key={link.href}
              href={anchorHref(link.href)}
              className="font-body text-[11px] uppercase tracking-[0.24em] text-muted-foreground transition hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <select
            aria-label="Language"
            value={language}
            onChange={(event) => chooseLanguage(event.target.value)}
            className="rounded-full border border-border bg-transparent px-3 py-2 font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground outline-none transition hover:border-primary hover:text-primary"
          >
            {LANGUAGES.map((entry) => (
              <option key={entry.code} value={entry.code}>
                {entry.short}
              </option>
            ))}
          </select>

          <a href={anchorHref("#offer")} className="btn-outline-dark hidden sm:inline-flex">
            {t.nav[3].label}
          </a>
        </div>
      </div>
    </header>
  );
}