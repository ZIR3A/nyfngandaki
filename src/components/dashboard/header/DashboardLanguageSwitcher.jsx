"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/localization/LanguageContext";

export function DashboardLanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <button 
      onClick={() => setLanguage(language === 'en' ? 'np' : 'en')}
      className="flex items-center gap-2 p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors font-medium text-sm"
      title="Toggle Language"
    >
      <Globe className="h-5 w-5" />
      <span className="hidden sm:inline-block uppercase">{language}</span>
    </button>
  );
}
