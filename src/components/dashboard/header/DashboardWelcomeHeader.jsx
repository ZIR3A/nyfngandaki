"use client";

import { DashboardGreeting } from "./DashboardGreeting";
import { DashboardUserInfo } from "./DashboardUserInfo";
import { DashboardOrganizationBadge } from "./DashboardOrganizationBadge";
import { DashboardDateTime } from "./DashboardDateTime";
import { DashboardQuickSummary } from "./DashboardQuickSummary";

export function DashboardWelcomeHeader({ user }) {

  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row justify-between lg:items-center gap-6 shadow-sm">
      
      {/* Decorative background pattern (optional subtlety) */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-red-100/50 dark:bg-red-900/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        <DashboardOrganizationBadge level="Province" name="Gandaki" className="mb-6 inline-flex" />
        
        <DashboardGreeting />
        
        <DashboardUserInfo 
          user={user} 
          role={user?.role || "Province Administrator"} 
        />
        
        <DashboardDateTime />
      </div>

      <div className="relative z-10 w-full lg:w-auto">
        <DashboardQuickSummary />
      </div>

    </div>
  );
}
