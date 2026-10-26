import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/LanguageContext";
import { RESORT_PHOTOS } from "@/lib/galleryPhotos";

const AUTOPLAY_MS = 6000;

export default function ResortSlideshow() {
  const { t } = useLanguage();
  const copy = t.gallery;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = RESORT_PHOTOS.length;
  const active = RESORT_PHOTOS[index];

  const go = (step) => setIndex((current) => (current + step + total) % total);

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % total), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, total]);

  return (
    <div
      className="mt-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        role="group"
        aria-label={copy.title}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") go(-1);
          if (event.key === "ArrowRight") go(1);
        }}
        className="relative overflow-hidden rounded-sm border border-border/70"
      >
        <Image src={active.src} alt={copy.captions[active.key]} className="h-[280px] w-full md:h-[560px]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/85 to-transparent" />
        <p className="absolute bottom-5 left-5 max-w-[70%] font-heading text-lg text-primary-foreground md:text-2xl">
          {copy.captions[active.key]}
        </p>
        <span className="absolute right-5 top-5 rounded-full bg-background/85 px-3 py-1 font-body text-[10px] uppercase tracking-[0.24em] text-primary">
          {index + 1} / {total}
        </span>

        <button
          type="button"
          aria-label={copy.prev}
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/85 p-2.5 text-primary transition hover:bg-background md:left-5"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label={copy.next}
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/85 p-2.5 text-primary transition hover:bg-background md:right-5"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {RESORT_PHOTOS.map((photo, position) => (
          <button
            key={photo.key}
            type="button"
            aria-label={copy.captions[photo.key]}
            onClick={() => setIndex(position)}
            className={`shrink-0 overflow-hidden rounded-sm border transition ${
              position === index ? "border-primary opacity-100" : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <Image src={photo.src} alt="" className="h-16 w-24" />
          </button>
        ))}
      </div>
    </div>
  );
}