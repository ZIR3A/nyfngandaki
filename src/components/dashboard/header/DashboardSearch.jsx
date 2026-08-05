"use client";

import { Search } from "lucide-react";

export function DashboardSearch() {
  return (
    <div className="hidden lg:flex flex-1 max-w-md mx-8">
      <div className="relative w-full group">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-[#1546B0] dark:group-focus-within:text-blue-400 transition-colors" />
        <input 
          type="text" 
          placeholder="Search everywhere..." 
          className="w-full bg-slate-100 dark:bg-slate-800 border border-transparent text-sm rounded-xl pl-10 pr-4 py-2 outline-none hover:bg-slate-200/50 dark:hover:bg-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:border-[#1546B0] dark:focus:border-blue-500 focus:ring-4 focus:ring-[#1546B0]/10 dark:focus:ring-blue-500/20 transition-all font-medium text-slate-900 dark:text-white placeholder:text-slate-500"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
          <kbd className="hidden xl:inline-flex items-center bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-400 dark:text-slate-300 shadow-sm">
            ⌘K
          </kbd>
        </div>
      </div>
    </div>
  );
}
