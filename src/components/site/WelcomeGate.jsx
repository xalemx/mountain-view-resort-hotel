import React, { useEffect } from "react";
import { X } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/LanguageContext";
import { useLocaleNav } from "@/lib/useLocaleNav";
import { LANGUAGES } from "@/lib/translations";
import { BRAND, IMAGES } from "@/lib/siteContent";

// The language choice on a first visit.
//
// It is a band above the page, not a screen in front of it, so the houses, the
// guide and every word of the page are readable before anyone clicks anything,
// and a search engine reading the page sees the content rather than only the
// chooser. Once a language has been chosen the band is gone for good; the
// footer can bring the chooser back as a dialog.
export default function WelcomeGate() {
  const { hasChosenLanguage, isChooserOpen, closeLanguageChooser, t } = useLanguage();
  const { switchLanguage } = useLocaleNav();

  const isFirstVisit = !hasChosenLanguage;
  const isDialog = !isFirstVisit && isChooserOpen;

  useEffect(() => {
    if (!isDialog) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isDialog]);

  if (!isFirstVisit && !isChooserOpen) return null;

  // Both renderings of the chooser sit on the dark green band, so every option is
  // written light-on-dark and each language is named in full rather than by code.
  const options = LANGUAGES.map((entry) => (
    <button
      key={entry.code}
      type="button"
      onClick={() => switchLanguage(entry.code)}
      className="group flex min-h-[48px] items-center justify-between gap-4 rounded-sm border border-primary-foreground/30 px-5 py-3 text-left transition hover:border-primary-foreground hover:bg-primary-foreground/10"
    >
      <span className="font-heading text-base text-primary-foreground">{entry.greeting}</span>
      <span className="font-body text-sm text-primary-foreground/85">{entry.label}</span>
    </button>
  ));

  if (isFirstVisit) {
    return (
      <section aria-label={t.footer.chooseLanguage} className="border-b border-border/60 bg-primary text-primary-foreground">
        <div className="section flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow text-primary-foreground/60">Gusinje · Crna Gora / Montenegro</p>
            <p className="mt-2 font-heading text-lg">
              {BRAND.name} · {t.footer.chooseLanguage}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:flex md:flex-wrap">{options}</div>
        </div>
      </section>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-primary px-6 py-12">
      <Image src={IMAGES.hero} alt="" className="absolute inset-0 h-full w-full opacity-70" />
      <div className="absolute inset-0 bg-primary/75" />

      <button
        type="button"
        onClick={closeLanguageChooser}
        aria-label="Close"
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/30 text-primary-foreground/80 transition hover:border-primary-foreground hover:text-primary-foreground"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="relative w-full max-w-xl text-center">
        <p className="eyebrow text-primary-foreground/60">Gusinje · Crna Gora / Montenegro</p>
        <h1 className="mt-5 font-display text-5xl leading-none text-primary-foreground md:text-6xl">
          {BRAND.name}
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-primary-foreground/80">
          {t.footer.chooseLanguage}
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">{options}</div>

        <small className="mt-10 block font-body text-[10px] uppercase tracking-[0.3em] text-primary-foreground/50">
          {BRAND.subtitle} · Prokletije
        </small>
      </div>
    </div>
  );
}