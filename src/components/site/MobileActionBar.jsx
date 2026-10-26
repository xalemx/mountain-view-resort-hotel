import React, { useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useAnchorHref } from "@/lib/siteNav";
import { BRAND } from "@/lib/siteContent";

export default function MobileActionBar() {
  const { t } = useLanguage();
  const anchorHref = useAnchorHref();

  useEffect(() => {
    document.body.classList.add("has-mobile-bar");
    return () => document.body.classList.remove("has-mobile-bar");
  }, []);

  return (
    <div className="mobile-action-bar fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 backdrop-blur lg:hidden">
      <div className="grid grid-cols-2 gap-2 px-4 py-2">
        <a href={anchorHref("#offer")} className="btn-pill min-h-[44px] justify-center px-3 text-center">
          {t.nav[3].label}
        </a>
        <a
          href={BRAND.whatsapp}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-border px-3 py-3 font-body text-[11px] font-medium uppercase tracking-[0.2em] text-foreground transition hover:border-primary hover:text-primary"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}