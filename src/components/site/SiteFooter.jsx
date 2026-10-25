import React from "react";
import { Link } from "react-router-dom";
import { BRAND } from "@/lib/siteContent";

export default function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section py-12">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-primary-foreground/15 pb-8">
          <span className="font-heading text-lg">
            △ {BRAND.name} <span className="text-primary-foreground/60">{BRAND.subtitle}</span>
          </span>
          <span className="font-body text-[11px] uppercase tracking-[0.24em] text-primary-foreground/70">
            {BRAND.place}
          </span>
          <a
            href={BRAND.phoneHref}
            className="text-sm underline decoration-primary-foreground/40 underline-offset-4 transition hover:decoration-primary-foreground"
          >
            {BRAND.phone}
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 font-body text-[11px] uppercase tracking-[0.24em] text-primary-foreground/60">
          <span>© 2026 Mountain View · Resort &amp; Inn</span>
          <Link to="/enquiries" className="transition hover:text-primary-foreground">
            Owner login
          </Link>
        </div>

        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-primary-foreground/50">
          Imagery is illustrative of the landscape around Gusinje, not a photograph of either property.
        </p>
      </div>
    </footer>
  );
}