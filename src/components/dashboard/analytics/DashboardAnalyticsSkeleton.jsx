export function DashboardAnalyticsSkeleton() {
  return (
    <div className="flex flex-col gap-6 lg:gap-8 animate-pulse">
      {/* Top Cards Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 h-28 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
              <div className="h-10 w-10 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
            </div>
            <div className="h-8 w-1/3 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
          </div>
        ))}
      </div>

      {/* Main Charts Row Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 h-80 flex flex-col">
          <div className="h-6 w-1/3 bg-slate-200 dark:bg-slate-700 rounded-md mb-8"></div>
          <div className="flex-1 flex items-end justify-between gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
               <div key={i} className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-md" style={{ height: `${20 + Math.random() * 80}%` }}></div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 h-80 flex flex-col">
          <div className="h-6 w-1/3 bg-slate-200 dark:bg-slate-700 rounded-md mb-8"></div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border-8 border-slate-100 dark:border-slate-800"></div>
          </div>
        </div>
      </div>
      
      {/* Bottom Insights Skeleton */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 h-32 flex flex-col justify-center">
        <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-700 rounded-md mb-4"></div>
        <div className="h-3 w-3/4 bg-slate-100 dark:bg-slate-800 rounded-md mb-2"></div>
        <div className="h-3 w-1/2 bg-slate-100 dark:bg-slate-800 rounded-md"></div>
      </div>
    </div>
  );
}
