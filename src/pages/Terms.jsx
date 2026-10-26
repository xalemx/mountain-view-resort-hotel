import React from "react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { useLanguage } from "@/lib/LanguageContext";
import { useLocaleNav } from "@/lib/useLocaleNav";
import { usePageSeo } from "@/lib/seo";
import { BRAND } from "@/lib/siteContent";

// What a request means, what a confirmation means, and what happens when plans
// change. Written from what the site already publishes, so nothing here commits
// the family to anything they have not already said.
export default function Terms() {
  const { t } = useLanguage();
  const { to } = useLocaleNav();
  usePageSeo("terms");

  const copy = t.terms;

  return (
    <div id="top" className="min-h-screen bg-background font-body text-foreground">
      <SiteHeader />

      <main className="section py-20 md:py-28">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-heading text-3xl leading-tight text-primary md:text-[2.6rem]">
          {copy.title}
        </h1>
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{copy.intro}</p>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="space-y-8">
            {copy.sections.map((section) => (
              <section key={section.title} className="border-t border-border/70 pt-6">
                <h2 className="font-heading text-lg text-primary">{section.title}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{section.text}</p>
              </section>
            ))}
          </div>

          <aside className="self-start rounded-sm border border-border/70 bg-card p-6 md:p-8">
            <p className="eyebrow">{t.hosts.reachTitle}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.hosts.reachNote}</p>

            <ul className="mt-6 text-sm text-foreground">
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
            </ul>

            <Link to={to("/privacy")} className="link-quiet mt-5 inline-flex">
              {copy.privacyLink} ↗
            </Link>

            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">{copy.updated}</p>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}