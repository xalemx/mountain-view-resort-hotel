import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";
import { useLocaleNav } from "@/lib/useLocaleNav";
import { BRAND } from "@/lib/siteContent";

// Who a guest is actually writing to. The words are the family's own, taken
// from the About page they approved; the line to them is the published one.
export default function HostIntroduction() {
  const { t } = useLanguage();
  const { to } = useLocaleNav();
  const copy = t.hosts;

  return (
    <section className="border-t border-border/60 py-20 md:py-24">
      <div className="section grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="mt-4 max-w-2xl font-heading text-2xl text-primary md:text-3xl">{copy.title}</h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-foreground">{copy.intro}</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{copy.detail}</p>
        </div>

        <div className="self-start rounded-sm border border-border/70 bg-card p-6 md:p-8">
          <p className="eyebrow">{copy.reachTitle}</p>

          <ul className="mt-5 text-sm text-foreground">
            <li className="border-b border-border/70 py-3">
              <a href={BRAND.phoneHref} className="transition hover:text-primary">
                {BRAND.phone}
              </a>
            </li>
            <li className="border-b border-border/70 py-3">
              <a href={BRAND.whatsapp} target="_blank" rel="noopener" className="transition hover:text-primary">
                WhatsApp ↗
              </a>
            </li>
            <li className="border-b border-border/70 py-3">
              <a href={BRAND.emailHref} className="transition hover:text-primary">
                {BRAND.email}
              </a>
            </li>
            <li className="border-b border-border/70 py-3">
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener"
                className="transition hover:text-primary"
              >
                {BRAND.instagramHandle} ↗
              </a>
            </li>
          </ul>

          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{copy.reachNote}</p>

          <Link to={to("/privacy")} className="link-quiet mt-5 inline-flex">
            {copy.privacyLink} ↗
          </Link>
        </div>
      </div>
    </section>
  );
}