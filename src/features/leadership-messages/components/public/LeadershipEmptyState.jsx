"use client";

import { MessageSquareOff } from "lucide-react";
import { useLanguage } from "@/localization/LanguageContext";

export default function LeadershipEmptyState() {
  const { language } = useLanguage();
  const isNepali = language === 'np';

  return (
    <div className="w-full flex flex-col items-center justify-center py-20 px-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-center">
      <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm mb-6">
        <MessageSquareOff className="w-10 h-10 text-slate-400 dark:text-slate-500" />
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
        {isNepali ? "कुनै सन्देश उपलब्ध छैन" : "No Messages Available"}
      </h3>
      
      <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
        {isNepali 
          ? "नेतृत्वका सन्देशहरू छिट्टै अपडेट गरिनेछ। कृपया पछि फेरि हेर्नुहोला।" 
          : "Leadership messages will be updated shortly. Please check back later."}
      </p>
    </div>
  );
}
