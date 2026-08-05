"use client";

import { Menu } from "lucide-react";
import { DashboardBreadcrumb } from "./DashboardBreadcrumb";
import { DashboardSearch } from "./DashboardSearch";
import { DashboardLanguageSwitcher } from "./DashboardLanguageSwitcher";
import { DashboardThemeToggle } from "./DashboardThemeToggle";
import { DashboardNotificationButton } from "./DashboardNotificationButton";
import { DashboardProfileDropdown } from "./DashboardProfileDropdown";
export function DashboardTopbar({ onMobileMenuToggle, user }) {

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 h-16 flex items-center justify-between transition-colors duration-300">
      
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-4">
        {onMobileMenuToggle && (
          <button 
            className="lg:hidden text-slate-500 hover:text-[#1546B0] transition-colors p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={onMobileMenuToggle}
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        
        {/* Placeholder for Logo on mobile if desired */}
        <div className="lg:hidden h-8 w-8 bg-[#1546B0] rounded-lg flex items-center justify-center shrink-0 shadow-sm">
          <span className="font-bold text-white text-xs">NYFN</span>
        </div>

        <DashboardBreadcrumb />
      </div>

      {/* Center: Global Search */}
      <DashboardSearch />

      {/* Right: Actions */}
      <div className="flex items-center gap-1 sm:gap-2">
        <DashboardLanguageSwitcher />
        <DashboardThemeToggle />
        <DashboardNotificationButton />
        
        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1 sm:mx-2 hidden sm:block"></div>
        
        <DashboardProfileDropdown user={user} />
      </div>

    </header>
  );
}
