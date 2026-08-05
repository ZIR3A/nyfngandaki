import { BarChart3 } from "lucide-react";

export function DashboardAnalyticsEmptyState() {
  return (
    <div className="py-20 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 border-dashed">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-5">
        <BarChart3 className="w-8 h-8 text-slate-400 dark:text-slate-500" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Analytics Data Yet</h3>
      <p className="text-sm text-slate-500 max-w-md text-center">
        The analytics dashboard requires member data to generate charts and insights. Add members to your organization to see this section come alive.
      </p>
    </div>
  );
}
