export function DashboardStatisticsSkeleton({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-full flex flex-col relative overflow-hidden animate-pulse">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800"></div>
            <div className="w-16 h-5 rounded-full bg-slate-100 dark:bg-slate-800"></div>
          </div>
          <div className="mt-auto space-y-2">
            <div className="w-20 h-8 rounded-lg bg-slate-200 dark:bg-slate-700"></div>
            <div className="w-32 h-4 rounded-md bg-slate-100 dark:bg-slate-800"></div>
          </div>
        </div>
      ))}
    </>
  );
}
