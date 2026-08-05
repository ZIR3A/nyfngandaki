export function DashboardOrganizationSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
      {/* Left Column - Hierarchy */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-6">
        <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
        <div className="flex-1 flex flex-col justify-between py-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800"></div>
              <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
              {i < 5 && <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 my-2"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Middle Column - Summary Cards */}
      <div className="flex flex-col gap-4">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800"></div>
            <div className="flex-1">
              <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded-md mb-2"></div>
              <div className="h-6 w-12 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Column - Health & Warnings */}
      <div className="flex flex-col gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="h-6 w-40 bg-slate-200 dark:bg-slate-700 rounded-md mb-6"></div>
          {[1, 2, 3].map(i => (
            <div key={i} className="mb-6 last:mb-0">
              <div className="flex justify-between mb-2">
                <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                <div className="h-4 w-12 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full"></div>
            </div>
          ))}
        </div>

        <div className="bg-orange-50 dark:bg-orange-950/20 rounded-2xl border border-orange-100 dark:border-orange-900/30 p-6 flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/50"></div>
          <div className="flex-1">
            <div className="h-4 w-32 bg-orange-200 dark:bg-orange-800/50 rounded-md mb-2"></div>
            <div className="h-3 w-48 bg-orange-200 dark:bg-orange-800/50 rounded-md mb-1"></div>
            <div className="h-3 w-40 bg-orange-200 dark:bg-orange-800/50 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
