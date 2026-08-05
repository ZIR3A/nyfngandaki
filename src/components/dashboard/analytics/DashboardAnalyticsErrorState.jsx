import { AlertTriangle, RefreshCcw } from "lucide-react";

export function DashboardAnalyticsErrorState({ error, onRetry }) {
  return (
    <div className="py-16 flex flex-col items-center justify-center bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-100 dark:border-red-900/30">
      <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center mb-4">
        <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
      </div>
      <h3 className="text-base font-bold text-red-900 dark:text-red-300 mb-2">Analytics Error</h3>
      <p className="text-sm text-red-600 dark:text-red-400/80 max-w-sm text-center mb-6">
        {error || "An unexpected error occurred while generating analytics."}
      </p>
      
      {onRetry && (
        <button 
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium transition-colors"
        >
          <RefreshCcw className="w-4 h-4" />
          Reload Analytics
        </button>
      )}
    </div>
  );
}
