import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardStatisticsEmptyState({ onRefresh }) {
  return (
    <div className="col-span-full py-12 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 border-dashed">
      <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
        <Info className="w-6 h-6 text-slate-400" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No Statistics Available</h3>
      <p className="text-sm text-slate-500 mb-4 max-w-sm text-center">
        There are currently no statistics to display for your organization or role. Data will appear here once activity occurs.
      </p>
      {onRefresh && (
        <Button onClick={onRefresh} variant="outline" className="bg-white dark:bg-slate-900">
          Refresh Data
        </Button>
      )}
    </div>
  );
}
