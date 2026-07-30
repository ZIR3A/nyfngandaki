import React from 'react';

export default function ImpactSkeleton() {
  return (
    <section className="w-full py-16 lg:py-16 lg:py-24 bg-gray-50 dark:bg-slate-950">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 animate-pulse">
        
        {/* Header Skeleton */}
        <div className="flex flex-col items-center mb-16">
          <div className="h-4 w-24 bg-gray-200 dark:bg-slate-800 rounded mb-4" />
          <div className="h-10 w-64 bg-gray-200 dark:bg-slate-800 rounded mb-4" />
          <div className="h-4 w-full max-w-lg bg-gray-200 dark:bg-slate-800 rounded" />
        </div>

        {/* Statistics Grid Skeleton (4 cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 w-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div className="h-12 w-12 bg-gray-200 dark:bg-slate-800 rounded-full" />
              <div>
                <div className="h-8 w-24 bg-gray-200 dark:bg-slate-800 rounded mb-3" />
                <div className="h-4 w-32 bg-gray-200 dark:bg-slate-800 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Impact Highlights / Achievements Skeleton (3 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[300px] bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl" />
          ))}
        </div>

      </div>
    </section>
  );
}
