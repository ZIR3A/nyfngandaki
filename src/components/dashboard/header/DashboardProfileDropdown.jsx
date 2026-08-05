"use client";

import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { signOut } from "next-auth/react";

export function DashboardProfileDropdown({ user }) {
  const initials = user?.name?.substring(0, 2).toUpperCase() || "SA";

  return (
    <div className="relative group">
      {/* Trigger */}
      <button className="flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 rounded-xl transition-colors">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#1546B0] to-[#0D2E78] text-white flex items-center justify-center font-bold text-xs shadow-sm uppercase">
          {initials}
        </div>
        <ChevronDown className="h-4 w-4 text-slate-400 hidden sm:block" />
      </button>

      {/* Dropdown Menu (Hover based for now, can use Radix DropdownMenu later) */}
      <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 origin-top-right transform scale-95 group-hover:scale-100">
        <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
          <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user?.name || "Admin User"}</p>
          <p className="text-xs text-slate-500 truncate">{user?.email || "admin@nyfngandaki.org"}</p>
        </div>
        <div className="py-1">
          <button className="w-full flex items-center px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
            <User className="h-4 w-4 mr-2" />
            My Account
          </button>
          <button className="w-full flex items-center px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </button>
        </div>
        <div className="py-1 border-t border-slate-100 dark:border-slate-800">
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
