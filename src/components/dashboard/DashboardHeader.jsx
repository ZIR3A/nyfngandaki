"use client";

import { Bell, Search, Globe, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardHeader({ onMobileMenuToggle }) {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 h-16 flex items-center justify-between transition-colors duration-300">
      
      <div className="flex items-center gap-4">
        {onMobileMenuToggle && (
          <Button variant="ghost" size="icon" className="lg:hidden text-slate-500" onClick={onMobileMenuToggle}>
            <Menu className="w-5 h-5" />
          </Button>
        )}
        <div className="hidden sm:block">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Good Morning, Admin</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">{currentDate}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden md:flex relative group">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-[#1546B0] transition-colors" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-64 pl-9 pr-4 py-1.5 bg-slate-100 dark:bg-slate-800 border-transparent rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#1546B0]/20 focus:bg-white dark:focus:bg-slate-900 transition-all text-slate-900 dark:text-white placeholder:text-slate-500"
          />
        </div>
        
        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block mx-1"></div>

        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 dark:hover:text-white h-9 w-9 rounded-full">
          <Globe className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 dark:hover:text-white h-9 w-9 rounded-full">
          <Sun className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-900 dark:hover:text-white h-9 w-9 rounded-full">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
        </Button>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block mx-1"></div>

        <button className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-[#1546B0] dark:text-blue-400 font-bold flex items-center justify-center text-sm border border-blue-200 dark:border-blue-800">
            A
          </div>
        </button>
      </div>

    </header>
  );
}
