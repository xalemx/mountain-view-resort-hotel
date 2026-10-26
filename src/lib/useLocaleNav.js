import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/lib/LanguageContext";
import { localePath, splitLanguage } from "@/lib/localePaths";

// One place that knows how to write a link and how to change language, so the
// language on screen and the language in the address always match.
export function useLocaleNav() {
  const { language, chooseLanguage } = useLanguage();
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const { rest } = splitLanguage(pathname);

  return {
    language,
    // A link to another page, kept in the language being read.
    to: (path) => localePath(path, language),
    // The same page in another language: /guide becomes /ru/guide.
    switchLanguage: (code) => {
      chooseLanguage(code);
      navigate(`${localePath(rest, code)}${hash || ""}`);
    },
  };
}