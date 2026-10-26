import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useAnchorHref } from "@/lib/siteNav";

const ITEM_CLASS =
  "flex min-h-[48px] items-center font-body text-[13px] uppercase tracking-[0.22em] text-muted-foreground transition hover:text-primary";

export default function MobileNavMenu() {
  const { t } = useLanguage();
  const anchorHref = useAnchorHref();
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

  const items = [
    { key: "home", label: t.menu.home, to: "/" },
    { key: "stays", label: t.menu.stays, anchor: "#stays" },
    { key: "gallery", label: t.menu.gallery, anchor: "#gallery" },
    { key: "guide", label: t.menu.guide, to: "/guide" },
    { key: "about", label: t.menu.about, to: "/about" },
    { key: "contact", label: t.menu.contact, to: "/contact" },
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
          className="absolute left-0 right-0 top-full border-b border-border bg-background shadow-lg lg:hidden"
        >
          <div className="section grid divide-y divide-border/60">
            {items.map((item) =>
              item.to ? (
                <Link key={item.key} to={item.to} className={ITEM_CLASS} onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
              ) : (
                <a key={item.key} href={anchorHref(item.anchor)} className={ITEM_CLASS} onClick={() => setIsOpen(false)}>
                  {item.label}
                </a>
              )
            )}
          </div>
        </nav>
      ) : null}
    </>
  );
}