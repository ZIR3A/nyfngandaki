export function DashboardHeaderSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row justify-between lg:items-center gap-6 shadow-sm animate-pulse">
      
      {/* Left side skeletons */}
      <div className="space-y-4">
        {/* Badge Skeleton */}
        <div className="w-32 h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
        
        {/* Greeting Skeleton */}
        <div className="w-64 h-10 bg-slate-200 dark:bg-slate-800 rounded-lg mt-4"></div>
        
        {/* User Info Skeleton */}
        <div className="flex items-center gap-4 mt-2">
          <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800"></div>
          <div className="space-y-2">
            <div className="w-32 h-5 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="w-48 h-4 bg-slate-100 dark:bg-slate-800/50 rounded"></div>
          </div>
        </div>

        {/* Date/Time Skeleton */}
        <div className="flex items-center gap-4 mt-4">
          <div className="w-32 h-5 bg-slate-100 dark:bg-slate-800/50 rounded"></div>
          <div className="w-24 h-5 bg-slate-100 dark:bg-slate-800/50 rounded"></div>
        </div>
      </div>

      {/* Right side Summary Skeleton */}
      <div className="w-full lg:max-w-sm h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>

    </div>
  );
}
