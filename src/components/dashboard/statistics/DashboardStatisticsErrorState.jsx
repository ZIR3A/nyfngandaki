import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardStatisticsErrorState({ error, onRetry }) {
  return (
    <div className="col-span-full py-12 flex flex-col items-center justify-center bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-200 dark:border-red-900/50 border-dashed">
      <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center mb-3">
        <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
      </div>
      <h3 className="text-lg font-bold text-red-900 dark:text-red-400 mb-1">Failed to load statistics</h3>
      <p className="text-sm text-red-600 dark:text-red-300 mb-4 max-w-sm text-center">
        {error || "An unexpected error occurred while fetching the dashboard statistics."}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="bg-white dark:bg-slate-900 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry Connection
        </Button>
      )}
    </div>
  );
}
