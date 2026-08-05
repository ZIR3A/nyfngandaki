import { AlertCircle } from "lucide-react";

export function DashboardQuickActionEmptyState() {
  return (
    <div className="col-span-full py-10 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 border-dashed">
      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
        <AlertCircle className="w-5 h-5 text-slate-400" />
      </div>
      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">No Quick Actions Available</h3>
      <p className="text-sm text-slate-500 max-w-sm text-center">
        Your current role does not have any configured quick actions.
      </p>
    </div>
  );
}
