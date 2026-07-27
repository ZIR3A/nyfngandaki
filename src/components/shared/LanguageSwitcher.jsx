"use client";

import { useLanguage } from "@/localization/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center border rounded-md overflow-hidden bg-background">
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1.5 text-sm font-medium transition-colors ${
          language === "en" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("np")}
        className={`px-3 py-1.5 text-sm font-medium transition-colors ${
          language === "np" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        }`}
      >
        NP
      </button>
    </div>
  );
}
