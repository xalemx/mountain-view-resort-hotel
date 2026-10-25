import React from "react";
import { BRAND } from "@/lib/siteContent";

const CHANNELS = [
  { name: "Instagram", href: BRAND.instagram },
  { name: "Threads", href: BRAND.threads },
];

export default function SocialSection() {
  return (
    <section className="border-t border-border/60 bg-secondary/50 py-20 md:py-28">
      <div className="section grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <p className="eyebrow">Between stays</p>
          <h2 className="mt-4 font-heading text-3xl text-primary md:text-[2.6rem]">Follow the seasons</h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Snow on the peaks in March, wildflowers in May, the first plums in August. We post what the valley is
            doing — and what is free at short notice.
          </p>
        </div>

        <div className="grid gap-4">
          {CHANNELS.map((channel) => (
            <a
              key={channel.name}
              href={channel.href}
              target="_blank"
              rel="noopener"
              className="group flex items-center justify-between rounded-sm border border-border/70 bg-card px-5 py-5 transition hover:border-primary"
            >
              <span className="font-heading text-lg text-primary">{channel.name}</span>
              <span className="text-xs text-muted-foreground transition group-hover:text-primary">
                {BRAND.instagramHandle} ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}