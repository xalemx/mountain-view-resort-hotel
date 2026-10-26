import { useLocation } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";
import { localePath, splitLanguage } from "@/lib/localePaths";

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