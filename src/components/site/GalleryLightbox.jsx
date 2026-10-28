import React, { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/LanguageContext";
import { useSwipe } from "@/hooks/use-swipe";

const ARROW_CLASS =
  "absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-primary-foreground/15 text-primary-foreground transition hover:bg-primary-foreground/30 motion-reduce:transition-none";

// Full-screen view of one photograph: swipe, arrows, captions and a close button.
export default function GalleryLightbox({ label, photos, captions, credit, index, onIndexChange, onClose }) {
  const { t } = useLanguage();
  const closeRef = useRef(null);
  const indexRef = useRef(index);
  const closeHandlerRef = useRef(onClose);
  const total = photos.length;

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    closeHandlerRef.current = onClose;
  }, [onClose]);

  const go = (step) => onIndexChange((index + step + total) % total);
  const swipe = useSwipe({ onLeft: () => go(1), onRight: () => go(-1) });

  useEffect(() => {
    const restoreFocus = document.activeElement;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") closeHandlerRef.current();
      if (event.key === "ArrowLeft") onIndexChange((indexRef.current - 1 + total) % total);
      if (event.key === "ArrowRight") onIndexChange((indexRef.current + 1) % total);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (restoreFocus instanceof HTMLElement) restoreFocus.focus();
    };
  }, [onIndexChange, total]);

  const active = photos[Math.min(index, total - 1)];
  const caption = captions[active.key];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-50 flex flex-col bg-primary/95 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <span className="font-body text-[11px] uppercase tracking-[0.24em] text-primary-foreground/70">
          {index + 1} / {total}
        </span>
        <p className="hidden truncate font-heading text-sm text-primary-foreground sm:block">{label}</p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t.gallery.close}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary-foreground/40 text-primary-foreground transition hover:border-primary-foreground hover:bg-primary-foreground/10 motion-reduce:transition-none"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div {...swipe} className="relative flex min-h-0 flex-1 items-center px-2">
        <Image
          key={active.src}
          src={active.src}
          alt={caption || label}
          fittingType="fit"
          quality={85}
          className="h-full max-h-[68vh] w-full md:max-h-[74vh]"
        />
        {total > 1 ? (
          <>
            <button type="button" aria-label={t.gallery.prev} onClick={() => go(-1)} className={`${ARROW_CLASS} left-2 md:left-4`}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" aria-label={t.gallery.next} onClick={() => go(1)} className={`${ARROW_CLASS} right-2 md:right-4`}>
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        ) : null}
      </div>

      <div className="px-5 pb-6 pt-4 text-center">
        {caption ? <p className="font-heading text-base text-primary-foreground md:text-xl">{caption}</p> : null}
        {credit ? <p className="mt-2 text-xs leading-relaxed text-primary-foreground/60">{credit}</p> : null}
      </div>
    </div>
  );
}