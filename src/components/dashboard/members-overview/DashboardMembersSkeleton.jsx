export function DashboardMembersSkeleton() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 animate-pulse">
      {/* Left Column */}
      <div className="xl:col-span-8 flex flex-col gap-6 lg:gap-8">
        
        {/* Recent Members */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="h-6 w-1/4 bg-slate-200 dark:bg-slate-700 rounded-md mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="border border-slate-100 dark:border-slate-800 rounded-xl p-4 flex gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 shrink-0"></div>
                <div className="flex-1">
                  <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded-md mb-2"></div>
                  <div className="h-3 w-3/4 bg-slate-100 dark:bg-slate-800 rounded-md mb-2"></div>
                  <div className="h-3 w-1/3 bg-slate-100 dark:bg-slate-800 rounded-md"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Updated Members */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="h-5 w-1/3 bg-slate-200 dark:bg-slate-700 rounded-md mb-6"></div>
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-700 rounded-md mb-1.5"></div>
                    <div className="h-3 w-1/2 bg-slate-100 dark:bg-slate-800 rounded-md"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="h-5 w-1/2 bg-slate-200 dark:bg-slate-700 rounded-md mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-md"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Spotlight */}
      <div className="xl:col-span-4 flex flex-col gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 h-full flex flex-col">
          <div className="h-6 w-1/2 bg-slate-200 dark:bg-slate-700 rounded-md mb-6"></div>
          <div className="flex flex-col gap-4 flex-1">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl p-5 text-center flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-700 mb-4"></div>
                <div className="h-5 w-3/4 bg-slate-300 dark:bg-slate-600 rounded-md mb-2"></div>
                <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
