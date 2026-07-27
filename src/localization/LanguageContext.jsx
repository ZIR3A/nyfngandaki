"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { en } from "./dictionaries/en";
import { np } from "./dictionaries/np";

const dictionaries = { en, np };

const LanguageContext = createContext({
  language: "en",
  setLanguage: () => {},
  t: () => "",
});

export function LanguageProvider({ children, initialLocale }) {
  const [language, setLanguageState] = useState(initialLocale || "en");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Sync state if URL changes
    if (initialLocale && initialLocale !== language) {
      // Avoid calling setLanguageState directly to prevent cascading renders
      // Instead, we just let the initial state take it if it matches.
    }
  }, [initialLocale]);

  const setLanguage = (newLanguage) => {
    if (newLanguage === language) return;
    document.cookie = `NEXT_LOCALE=${newLanguage}; path=/; max-age=31536000`; // 1 year
    setLanguageState(newLanguage);
    
    // Replace the locale in the pathname
    const segments = pathname.split("/");
    if (segments.length > 1 && ["en", "np"].includes(segments[1])) {
      segments[1] = newLanguage;
      router.push(segments.join("/") || "/");
    }
  };

  const t = (key) => {
    const keys = key.split(".");
    let value = dictionaries[language];
    for (const k of keys) {
      if (value === undefined) break;
      value = value[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
