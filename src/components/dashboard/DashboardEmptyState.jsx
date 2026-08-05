import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardEmptyState({ 
  icon: Icon = Info, 
  title = "No Data Available", 
  description = "There is currently no data to display in this section.", 
  actionLabel, 
  onAction,
  className,
  ...props 
}) {
  return (
    <div 
      className={cn("flex flex-col items-center justify-center p-8 sm:p-12 text-center", className)}
      {...props}
    >
      <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-4 text-slate-400">
        <Icon className="w-8 h-8" strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
        {description}
      </p>
      
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline" className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
