import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LANGUAGE, LANGUAGES, TRANSLATIONS } from "@/lib/translations";

const STORAGE_KEY = "mountain-view-language";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  });
  const [isChooserOpen, setIsChooserOpen] = useState(false);

  useEffect(() => {
    const active = LANGUAGES.find((entry) => entry.code === (language || DEFAULT_LANGUAGE));
    document.documentElement.lang = active ? active.html : DEFAULT_LANGUAGE;
  }, [language]);

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
      chooseLanguage,
      t: TRANSLATIONS[language] || TRANSLATIONS[DEFAULT_LANGUAGE],
    }),
    [language, isChooserOpen, chooseLanguage]
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