import { cn } from "@/lib/utils";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardErrorState({ 
  title = "Failed to load data", 
  description = "An error occurred while fetching the information for this widget.", 
  onRetry,
  className,
  ...props 
}) {
  return (
    <div 
      className={cn("flex flex-col items-center justify-center p-8 sm:p-12 text-center", className)}
      {...props}
    >
      <div className="w-16 h-16 bg-red-50 dark:bg-red-900/10 rounded-full flex items-center justify-center mb-4 text-red-500">
        <AlertCircle className="w-8 h-8" strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
        {description}
      </p>
      
      {onRetry && (
        <Button 
          onClick={onRetry} 
          variant="outline" 
          className="bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-slate-800"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry Request
        </Button>
      )}
    </div>
  );
}
