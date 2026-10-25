import React from "react";
import { BRAND, NAV_LINKS } from "@/lib/siteContent";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="section flex items-center justify-between gap-6 py-4">
        <a href="#top" className="flex items-center gap-3">
          <span className="font-display text-2xl leading-none text-primary">△</span>
          <span className="leading-none">
            <span className="block font-heading text-sm tracking-[0.18em] text-primary uppercase">{BRAND.name}</span>
            <span className="mt-1 block font-body text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
              {BRAND.subtitle}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-[11px] uppercase tracking-[0.24em] text-muted-foreground transition hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#offer" className="btn-outline-dark">
          Request an offer
        </a>
      </div>
    </header>
  );
}