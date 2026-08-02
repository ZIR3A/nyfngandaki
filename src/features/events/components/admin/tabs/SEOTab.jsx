"use client";

import { useFormContext } from "react-hook-form";

export default function SEOTab() {
  const { register } = useFormContext();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">SEO Settings</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Meta Title</label>
          <input 
            {...register("seoTitle")} 
            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1546B0]"
            placeholder="Custom SEO Title (optional)"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Tags (Comma separated)</label>
          <input 
            {...register("tags")} 
            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1546B0]"
            placeholder="e.g. youth, empowerment, leadership"
          />
          <p className="text-xs text-slate-500">Separate multiple tags with commas.</p>
        </div>
      </div>
    </div>
  );
}
