import React from 'react';

export default function ConnectSkeleton() {
  return (
    <section className="w-full py-16 lg:py-16 lg:py-24 bg-gray-50 dark:bg-slate-950">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 animate-pulse">
        
        {/* Leadership Split Skeleton */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-32 items-center">
          {/* Photo side */}
          <div className="w-full lg:w-[45%]">
            <div className="w-full aspect-[4/5] rounded-[2rem] bg-gray-200 dark:bg-slate-800" />
          </div>
          {/* Text side */}
          <div className="w-full lg:w-[55%]">
            <div className="h-6 w-32 bg-gray-200 dark:bg-slate-800 rounded mb-4" />
            <div className="h-10 w-3/4 bg-gray-200 dark:bg-slate-800 rounded mb-8" />
            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-full bg-gray-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-full bg-gray-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-4/6 bg-gray-200 dark:bg-slate-800 rounded" />
            </div>
          </div>
        </div>

        {/* Grids Skeleton (3 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 w-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl" />
          ))}
        </div>

        {/* CTA Banner Skeleton */}
        <div className="w-full h-80 bg-gray-200 dark:bg-slate-800 rounded-3xl" />

      </div>
    </section>
  );
}
