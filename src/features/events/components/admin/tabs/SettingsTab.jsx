"use client";

import { useFormContext } from "react-hook-form";

export default function SettingsTab() {
  const { register } = useFormContext();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Advanced Settings</h3>
      
      <div className="space-y-6">
        {/* Featured Toggle */}
        <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white">Featured Event</h4>
            <p className="text-sm text-slate-500">Highlight this event on the home page and top of listings.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" {...register("isFeatured")} className="sr-only peer" />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-[#1546B0]"></div>
          </label>
        </div>

        <h4 className="font-semibold text-slate-900 dark:text-white pt-4 border-t border-slate-200 dark:border-slate-800">Contact Information</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone</label>
            <input 
              {...register("contact.phone")} 
              className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1546B0]"
              placeholder="e.g. +977 1234567890"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
            <input 
              {...register("contact.email")} 
              type="email"
              className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1546B0]"
              placeholder="e.g. info@nyfngandaki.org"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Website / Link</label>
            <input 
              {...register("contact.website")} 
              className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1546B0]"
              placeholder="e.g. https://example.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
