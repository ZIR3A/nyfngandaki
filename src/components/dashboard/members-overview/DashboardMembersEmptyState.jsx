import { Users } from "lucide-react";

export function DashboardMembersEmptyState() {
  return (
    <div className="py-20 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 border-dashed">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-5">
        <Users className="w-8 h-8 text-slate-400 dark:text-slate-500" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Members Activity</h3>
      <p className="text-sm text-slate-500 max-w-md text-center">
        No recent members or leadership updates found. Start adding members to populate this section.
      </p>
    </div>
  );
}
