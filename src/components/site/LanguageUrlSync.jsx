import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";

// Keeps the language on screen in step with the address, for a page opened
// straight from a link, a bookmark or the back button.
export default function LanguageUrlSync() {
  const { pathname } = useLocation();
  const { applyLanguageFromPath } = useLanguage();

  useEffect(() => {
    applyLanguageFromPath(pathname);
  }, [pathname, applyLanguageFromPath]);

  return null;
}