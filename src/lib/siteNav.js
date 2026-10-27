import { useLocation } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";
import { localePath, splitLanguage } from "@/lib/localePaths";
import { MENU_PATH } from "@/lib/menu";
import { PROPERTIES } from "@/lib/siteContent";

/**
 * Keeps the one-page anchor links working from the standalone pages, and keeps
 * the language in the address: on the home page a link stays a plain hash,
 * elsewhere it points back home, in the language being read.
 */
export function useAnchorHref() {
  const { pathname } = useLocation();
  const { language } = useLanguage();

  return (hash) => {
    const { rest } = splitLanguage(pathname);
    if (rest === "/" || rest === "") return hash;
    return `${localePath("/", language)}${hash}`;
  };
}

// The links in the header and the mobile menu, in the order they are read. The
// labels live with the four languages, under `nav` and `menu` in
// src/lib/translations.js.
export const NAV_LINKS = [
  { key: "properties", hash: "#stays" },
  { key: "restaurant", path: MENU_PATH },
  { key: "guide", path: "/guide" },
  { key: "contact", path: "/contact" },
];

/**
 * The address the offer button leads to. On a house's own page that is the
 * request form on the same page, with the house already chosen, so nobody is
 * sent back to the home page to ask about the house they are reading about.
 */
export function useOfferHref() {
  const anchorHref = useAnchorHref();
  const { pathname } = useLocation();
  const { rest } = splitLanguage(pathname);

  const onPropertyPage = PROPERTIES.some((property) => property.path === rest);

  return onPropertyPage ? "#property-offer" : anchorHref("#offer");
}