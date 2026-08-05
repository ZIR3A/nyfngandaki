"use client";

import { useLanguage } from "@/localization/LanguageContext";
import { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";

export function DashboardDateTime() {
  const { language } = useLanguage();
  const [time, setTime] = useState(null);
  
  useEffect(() => {
    // Initial set
    setTime(new Date());
    
    // Update every minute to avoid too many re-renders
    const interval = setInterval(() => {
      setTime(new Date());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return <div className="h-5 w-48 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>;
  }

  const locale = language === 'np' ? 'ne-NP' : 'en-US';
  
  const dateStr = time.toLocaleDateString(locale, { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });
  
  const timeStr = time.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-400 mt-4">
      <div className="flex items-center gap-1.5">
        <Calendar className="w-4 h-4 text-[#1546B0] dark:text-blue-400" />
        <span>{dateStr}</span>
      </div>
      <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700 hidden sm:block"></div>
      <div className="flex items-center gap-1.5">
        <Clock className="w-4 h-4 text-[#1546B0] dark:text-blue-400" />
        <span>{timeStr}</span>
      </div>
    </div>
  );
}
