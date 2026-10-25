import React from "react";
import { Image } from "@/components/ui/image";
import { BRAND, IMAGES } from "@/lib/siteContent";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={IMAGES.hero}
        alt="The Prokletije mountains above the Grebaje valley"
        className="absolute inset-0 -z-10 h-full w-full"
      />
      <div className="absolute inset-0 -z-10 bg-primary/65" />

      <div className="section flex min-h-[85vh] flex-col justify-end pb-10 pt-24 md:min-h-[88vh]">
        <p className="eyebrow text-primary-foreground/70">Gusinje · Montenegro</p>
        <h1 className="mt-5 max-w-3xl font-display text-[3.4rem] leading-[0.95] text-primary-foreground md:text-[5.4rem]">
          {BRAND.name}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/85">
          Two places to stay, one extraordinary corner of Montenegro. A resort and an inn at the foot of the
          Prokletije mountains, between the Grebaje valley and the small town of Gusinje.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#stays" className="btn-cream">
            Find your stay ↗
          </a>
          <a href="#offer" className="btn-outline-light">
            Request an offer
          </a>
        </div>

        <div className="mt-14 flex items-center justify-between border-t border-primary-foreground/25 pt-5 text-[10px] uppercase tracking-[0.3em] text-primary-foreground/70">
          <span>Two places to stay · A world to discover</span>
          <span className="hidden sm:inline">01 / Prokletije</span>
        </div>
      </div>
    </section>
  );
}