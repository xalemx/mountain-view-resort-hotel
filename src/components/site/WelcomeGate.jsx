import React, { useEffect } from "react";
import { X } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/LanguageContext";
import { LANGUAGES } from "@/lib/translations";
import { BRAND, IMAGES } from "@/lib/siteContent";

export default function WelcomeGate() {
  const { hasChosenLanguage, isChooserOpen, chooseLanguage, closeLanguageChooser } = useLanguage();
  const isOpen = !hasChosenLanguage || isChooserOpen;

  useEffect(() => {
    if (!isOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-primary px-6 py-12">
      <Image src={IMAGES.hero} alt="" className="absolute inset-0 h-full w-full opacity-70" />
      <div className="absolute inset-0 bg-primary/75" />

      {hasChosenLanguage ? (
        <button
          type="button"
          onClick={closeLanguageChooser}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/30 text-primary-foreground/80 transition hover:border-primary-foreground hover:text-primary-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}

      <div className="relative w-full max-w-xl text-center">
        <p className="eyebrow text-primary-foreground/60">Gusinje · Crna Gora / Montenegro</p>
        <h1 className="mt-5 font-display text-5xl leading-none text-primary-foreground md:text-6xl">
          {BRAND.name}
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-primary-foreground/80">
          Two places to stay. A world to discover.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {LANGUAGES.map((entry) => (
            <button
              key={entry.code}
              type="button"
              onClick={() => chooseLanguage(entry.code)}
              className="group flex items-center justify-between gap-4 rounded-sm border border-primary-foreground/25 px-5 py-4 text-left transition hover:border-primary-foreground hover:bg-primary-foreground/10"
            >
              <span className="font-heading text-lg text-primary-foreground">{entry.greeting}</span>
              <span className="font-body text-[10px] uppercase tracking-[0.24em] text-primary-foreground/60 transition group-hover:text-primary-foreground">
                {entry.label}
              </span>
            </button>
          ))}
        </div>

        <small className="mt-10 block font-body text-[10px] uppercase tracking-[0.3em] text-primary-foreground/50">
          {BRAND.subtitle} · Prokletije
        </small>
      </div>
    </div>
  );
}