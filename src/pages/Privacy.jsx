import React from "react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { useLanguage } from "@/lib/LanguageContext";
import { usePageSeo } from "@/lib/seo";
import PropertyContacts from "@/components/site/PropertyContacts";

// What happens to a guest's details, written for the way they reach us: the
// enquiry form, the phone and WhatsApp.
export default function Privacy() {
  const { t } = useLanguage();
  usePageSeo("privacy");

  const copy = t.privacy;

  return (
    <div id="top" className="min-h-screen bg-background font-body text-foreground">
      <SiteHeader />

      <main className="section py-20 md:py-28">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-heading text-3xl leading-tight text-primary md:text-[2.6rem]">
          {copy.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">{copy.intro}</p>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="space-y-8">
            {copy.sections.map((section) => (
              <section key={section.title} className="border-t border-border/70 pt-6">
                <h2 className="font-heading text-lg text-primary">{section.title}</h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">{section.text}</p>
              </section>
            ))}
          </div>

          <aside className="self-start rounded-sm border border-border/70 bg-card p-6 md:p-8">
            <p className="eyebrow">{copy.contactTitle}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy.contactText}</p>

            <PropertyContacts className="mt-6" />

            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">{copy.updated}</p>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}