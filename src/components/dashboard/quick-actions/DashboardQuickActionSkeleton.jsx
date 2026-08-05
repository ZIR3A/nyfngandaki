export function DashboardQuickActionSkeleton({ count = 4 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i} 
          className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 relative overflow-hidden animate-pulse"
        >
          {/* Icon Skeleton */}
          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0"></div>
          
          {/* Text Skeleton */}
          <div className="flex-1 space-y-2">
            <div className="w-24 h-5 rounded-md bg-slate-200 dark:bg-slate-700"></div>
            <div className="w-32 h-4 rounded-md bg-slate-100 dark:bg-slate-800"></div>
          </div>

          {/* Arrow Skeleton */}
          <div className="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-800 shrink-0"></div>
        </div>
      ))}
    </>
  );
}
