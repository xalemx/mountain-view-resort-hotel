import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Pause, Play } from "lucide-react";
import { Image } from "@/components/ui/image";
import GalleryLightbox from "@/components/site/GalleryLightbox";
import { useLanguage } from "@/lib/LanguageContext";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useSwipe } from "@/hooks/use-swipe";

const AUTOPLAY_MS = 6000;

const CONTROL_CLASS =
  "flex h-11 w-11 items-center justify-center rounded-full bg-background/85 text-primary transition hover:bg-background motion-reduce:transition-none";

export default function PhotoGallery({ label, photos, captions, credit }) {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  // null means "follow the visitor's motion preference", true/false is their own choice
  const [playing, setPlaying] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const total = photos.length;

  const go = (step) => setIndex((current) => (current + step + total) % total);
  const swipe = useSwipe({ onLeft: () => go(1), onRight: () => go(-1) });

  const wantsAutoplay = playing === null ? !prefersReducedMotion : playing;
  const isPlaying = total > 1 && !isFullScreen && !isHovered && wantsAutoplay;

  useEffect(() => {
    if (!isPlaying) return undefined;
    const timer = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [index, isPlaying, total]);

  if (!total) return null;

  const active = photos[Math.min(index, total - 1)];
  const caption = captions[active.key];

  return (
    <div className="mt-10">
      <div
        role="group"
        aria-label={label}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") go(-1);
          if (event.key === "ArrowRight") go(1);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        {...swipe}
        className="relative overflow-hidden rounded-sm border border-border/70"
      >
        <Image src={active.src} alt={caption || label} quality={85} className="h-[280px] w-full md:h-[540px]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/85 to-transparent" />

        {caption ? (
          <p className="absolute bottom-5 left-5 max-w-[65%] font-heading text-lg text-primary-foreground md:text-2xl">
            {caption}
          </p>
        ) : null}

        <span className="absolute right-5 top-5 rounded-full bg-background/85 px-3 py-1 font-body text-[10px] uppercase tracking-[0.24em] text-primary">
          {index + 1} / {total}
        </span>

        {total > 1 ? (
          <>
            <button
              type="button"
              aria-label={t.gallery.prev}
              onClick={() => go(-1)}
              className={`${CONTROL_CLASS} absolute left-3 top-1/2 -translate-y-1/2 md:left-5`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label={t.gallery.next}
              onClick={() => go(1)}
              className={`${CONTROL_CLASS} absolute right-3 top-1/2 -translate-y-1/2 md:right-5`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        ) : null}

        <div className="absolute bottom-4 right-4 flex gap-2">
          {total > 1 ? (
            <button
              type="button"
              aria-label={wantsAutoplay ? t.gallery.pause : t.gallery.play}
              onClick={() => setPlaying(!wantsAutoplay)}
              className={CONTROL_CLASS}
            >
              {wantsAutoplay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
          ) : null}
          <button type="button" aria-label={t.gallery.open} onClick={() => setIsFullScreen(true)} className={CONTROL_CLASS}>
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {total > 1 ? (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {photos.map((photo, position) => (
            <button
              key={photo.key}
              type="button"
              aria-label={captions[photo.key] || label}
              onClick={() => setIndex(position)}
              className={`shrink-0 overflow-hidden rounded-sm border transition motion-reduce:transition-none ${
                position === index ? "border-primary opacity-100" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={photo.src} alt="" quality={70} className="h-16 w-24" />
            </button>
          ))}
        </div>
      ) : null}

      {credit ? <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{credit}</p> : null}

      {isFullScreen ? (
        <GalleryLightbox
          label={label}
          photos={photos}
          captions={captions}
          credit={credit}
          index={index}
          onIndexChange={setIndex}
          onClose={() => setIsFullScreen(false)}
        />
      ) : null}
    </div>
  );
}