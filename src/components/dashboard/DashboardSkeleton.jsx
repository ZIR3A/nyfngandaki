import { cn } from "@/lib/utils";

export function DashboardSkeleton({ className, type = "card", ...props }) {
  if (type === "card") {
    return (
      <div 
        className={cn("bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col p-6 animate-pulse", className)}
        {...props}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
          <div className="space-y-2">
            <div className="w-24 h-4 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
            <div className="w-32 h-3 bg-slate-100 dark:bg-slate-800/50 rounded-md"></div>
          </div>
        </div>
        <div className="space-y-2 mt-auto">
          <div className="w-full h-8 bg-slate-100 dark:bg-slate-800/50 rounded-md"></div>
          <div className="w-2/3 h-8 bg-slate-100 dark:bg-slate-800/50 rounded-md"></div>
        </div>
      </div>
    );
  }

  if (type === "list") {
    return (
      <div className={cn("space-y-4 animate-pulse", className)} {...props}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4 py-2">
            <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="w-1/3 h-4 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
              <div className="w-1/2 h-3 bg-slate-100 dark:bg-slate-800/50 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default block skeleton
  return (
    <div className={cn("w-full h-32 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse", className)} {...props} />
  );
}
