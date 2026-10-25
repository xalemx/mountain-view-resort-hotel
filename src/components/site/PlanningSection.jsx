import React from "react";
import SectionHeading from "@/components/site/SectionHeading";
import { BRAND, FAQS } from "@/lib/siteContent";

export default function PlanningSection() {
  return (
    <section id="plan" className="bg-primary py-20 text-primary-foreground md:py-28">
      <div className="section grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading tone="dark" eyebrow="Plan your visit" title="Getting here & when to come" />
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-primary-foreground/75">
            We are happy to help with the details before you book — transfers, luggage, a table for dinner, or the
            right trail for the time you have.
          </p>
          <a
            href={BRAND.tourism}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-flex font-body text-[11px] uppercase tracking-[0.2em] text-primary-foreground underline decoration-primary-foreground/40 underline-offset-4 transition hover:decoration-primary-foreground"
          >
            More on Gusinje tourism ↗
          </a>
        </div>

        <div className="divide-y divide-primary-foreground/15 border-y border-primary-foreground/15">
          {FAQS.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-heading text-lg text-primary-foreground">
                {faq.question}
                <span className="mt-0.5 text-primary-foreground/50 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/75">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}