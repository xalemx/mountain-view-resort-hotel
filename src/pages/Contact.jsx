import React from "react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import EnquiryForm from "@/components/site/EnquiryForm";
import AskMountainView from "@/components/site/AskMountainView";
import { useLanguage } from "@/lib/LanguageContext";
import { BRAND } from "@/lib/siteContent";

export default function Contact() {
  const { t } = useLanguage();

  const methods = [
    { label: t.contact.whatsapp, value: BRAND.phone, href: BRAND.whatsapp, external: true },
    { label: t.contact.phone, value: BRAND.phone, href: BRAND.phoneHref },
    { label: t.contact.instagram, value: BRAND.instagramHandle, href: BRAND.instagram, external: true },
    { label: t.contact.threads, value: BRAND.instagramHandle, href: BRAND.threads, external: true },
  ];

  return (
    <div id="top" className="min-h-screen bg-background font-body text-foreground">
      <SiteHeader />

      <main className="section py-20 md:py-28">
        <p className="eyebrow">{t.contact.eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-heading text-3xl leading-tight text-primary md:text-[2.6rem]">
          {t.contact.title}
        </h1>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground">{t.contact.intro}</p>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <ul className="space-y-4">
            {methods.map((method) => (
              <li key={method.label} className="border-b border-border/70 pb-4">
                <a
                  href={method.href}
                  target={method.external ? "_blank" : undefined}
                  rel={method.external ? "noopener" : undefined}
                  className="group flex flex-wrap items-baseline justify-between gap-2 transition"
                >
                  <span className="font-body text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                    {method.label}
                  </span>
                  <span className="font-heading text-lg text-primary underline decoration-border underline-offset-4 transition group-hover:decoration-primary">
                    {method.value}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div>
            <h2 className="font-heading text-xl text-primary md:text-2xl">{t.contact.formTitle}</h2>
            <div className="mt-6">
              <EnquiryForm />
            </div>
          </div>
        </div>

        <AskMountainView defaultTopic="practical" />
      </main>

      <SiteFooter />
    </div>
  );
}