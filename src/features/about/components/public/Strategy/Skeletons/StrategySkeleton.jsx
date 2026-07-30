import React from 'react';

export default function StrategySkeleton() {
  return (
    <section className="w-full py-16 lg:py-16 lg:py-24 bg-white dark:bg-slate-950">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 animate-pulse">
        
        {/* Vision Skeleton */}
        <div className="flex flex-col items-center mb-32">
          <div className="h-4 w-24 bg-gray-200 dark:bg-slate-800 rounded mb-6" />
          <div className="h-10 w-full max-w-lg bg-gray-200 dark:bg-slate-800 rounded mb-6" />
          <div className="h-4 w-full max-w-2xl bg-gray-200 dark:bg-slate-800 rounded mb-3" />
          <div className="h-4 w-3/4 max-w-xl bg-gray-200 dark:bg-slate-800 rounded" />
        </div>

        {/* Mission Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-32">
          <div className="w-full aspect-video lg:aspect-square bg-gray-200 dark:bg-slate-800 rounded-3xl" />
          <div className="flex flex-col justify-center">
            <div className="h-4 w-24 bg-gray-200 dark:bg-slate-800 rounded mb-6" />
            <div className="h-10 w-3/4 bg-gray-200 dark:bg-slate-800 rounded mb-6" />
            <div className="h-4 w-full bg-gray-200 dark:bg-slate-800 rounded mb-3" />
            <div className="h-4 w-full bg-gray-200 dark:bg-slate-800 rounded mb-3" />
            <div className="h-4 w-4/5 bg-gray-200 dark:bg-slate-800 rounded" />
          </div>
        </div>

        {/* Objectives / Core Values Grid Skeleton */}
        <div className="mb-20">
          <div className="h-4 w-32 bg-gray-200 dark:bg-slate-800 rounded mb-6" />
          <div className="h-10 w-64 bg-gray-200 dark:bg-slate-800 rounded mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-gray-200 dark:bg-slate-800 rounded-2xl" />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
