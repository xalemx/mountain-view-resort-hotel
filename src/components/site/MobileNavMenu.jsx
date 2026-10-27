import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useAnchorHref, useOfferHref } from "@/lib/siteNav";
import { useLocaleNav } from "@/lib/useLocaleNav";
import { MENU_PATH } from "@/lib/menu";
import { PROPERTIES } from "@/lib/siteContent";

const ITEM_CLASS =
  "flex min-h-[48px] items-center font-body text-[15px] font-medium text-foreground transition hover:text-primary";

export default function MobileNavMenu() {
  const { t } = useLanguage();
  const { to } = useLocaleNav();
  const anchorHref = useAnchorHref();
  const offerHref = useOfferHref();
  const { pathname, hash } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      buttonRef.current?.focus();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Both houses are named one by one and the restaurant menu is one tap away:
  // nobody has to open the home page first to reach either of them.
  const items = [
    { key: "properties", label: t.nav.properties, anchor: "#stays" },
    ...PROPERTIES.map((property) => ({ key: property.id, label: property.name, to: property.path })),
    { key: "restaurant", label: t.menu.restaurant, to: MENU_PATH },
    { key: "guide", label: t.nav.guide, to: "/guide" },
    { key: "about", label: t.menu.about, to: "/about" },
    { key: "contact", label: t.nav.contact, to: "/contact" },
  ];

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? t.menu.close : t.menu.label}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition hover:border-primary hover:text-primary lg:hidden"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen ? (
        <nav
          id="mobile-menu"
          aria-label={t.menu.label}
          className="absolute left-0 right-0 top-full max-h-[80vh] overflow-y-auto border-b border-border bg-background shadow-lg lg:hidden"
        >
          <div className="section grid divide-y divide-border/60">
            {items.map((item) =>
              item.to ? (
                <Link key={item.key} to={to(item.to)} className={ITEM_CLASS} onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
              ) : (
                <a key={item.key} href={anchorHref(item.anchor)} className={ITEM_CLASS} onClick={() => setIsOpen(false)}>
                  {item.label}
                </a>
              )
            )}
          </div>

          <div className="section pb-4 pt-2">
            <a href={offerHref} className="btn-pill w-full" onClick={() => setIsOpen(false)}>
              {t.nav.offer}
            </a>
          </div>
        </nav>
      ) : null}
    </>
  );
}