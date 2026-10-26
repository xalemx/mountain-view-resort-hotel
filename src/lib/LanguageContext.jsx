import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { splitLanguage } from "@/lib/localePaths";
import { DEFAULT_LANGUAGE, LANGUAGES, TRANSLATIONS } from "@/lib/translations";

const STORAGE_KEY = "mountain-view-language";

const LanguageContext = createContext(null);

const readStoredLanguage = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return LANGUAGES.some((entry) => entry.code === stored) ? stored : null;
  } catch (error) {
    return null;
  }
};

// The address comes first: /ru/guide is the Russian guide whoever opens it.
// Without a prefix the visitor's own choice is used, and failing that the
// language band asks.
const readInitialLanguage = () => {
  const { code, prefixed } = splitLanguage(window.location.pathname);
  if (prefixed) return code;
  return readStoredLanguage();
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(readInitialLanguage);
  const [isChooserOpen, setIsChooserOpen] = useState(false);

  useEffect(() => {
    const active = LANGUAGES.find((entry) => entry.code === (language || DEFAULT_LANGUAGE));
    document.documentElement.lang = active ? active.html : DEFAULT_LANGUAGE;
  }, [language]);

  // Called on every route change, so opening /ru/guide from a link or the back
  // button shows Russian. An address without a prefix leaves the choice alone.
  const applyLanguageFromPath = useCallback((pathname) => {
    const { code, prefixed } = splitLanguage(pathname);
    if (!prefixed) return;
    setLanguage((current) => (current === code ? current : code));
  }, []);

  const chooseLanguage = useCallback((code) => {
    setLanguage(code);
    setIsChooserOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch (error) {
      // storage unavailable — the choice simply lasts for this visit
    }
  }, []);

  const value = useMemo(
    () => ({
      language: language || DEFAULT_LANGUAGE,
      hasChosenLanguage: Boolean(language),
      isChooserOpen,
      openLanguageChooser: () => setIsChooserOpen(true),
      closeLanguageChooser: () => setIsChooserOpen(false),
      chooseLanguage,
      applyLanguageFromPath,
      t: TRANSLATIONS[language] || TRANSLATIONS[DEFAULT_LANGUAGE],
    }),
    [language, isChooserOpen, chooseLanguage, applyLanguageFromPath]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside a LanguageProvider");
  }
  return context;
}