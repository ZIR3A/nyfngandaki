"use client";

import { Bell } from "lucide-react";

export function DashboardNotificationButton({ hasUnread = true }) {
  return (
    <button className="relative p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
      <Bell className="h-5 w-5" />
      {hasUnread && (
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-slate-900"></span>
      )}
    </button>
  );
}
