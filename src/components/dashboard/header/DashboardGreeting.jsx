"use client";

import { useLanguage } from "@/localization/LanguageContext";
import { useEffect, useState } from "react";

export function DashboardGreeting() {
  const { language } = useLanguage();
  const [greeting, setGreeting] = useState("Good Morning");

  useEffect(() => {
    const hour = new Date().getHours();
    
    if (hour < 12) {
      setGreeting(language === 'np' ? 'शुभ प्रभात' : 'Good Morning');
    } else if (hour < 18) {
      setGreeting(language === 'np' ? 'शुभ दिउँसो' : 'Good Afternoon');
    } else {
      setGreeting(language === 'np' ? 'शुभ साँझ' : 'Good Evening');
    }
  }, [language]);

  return (
    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
      {greeting},
    </h2>
  );
}
