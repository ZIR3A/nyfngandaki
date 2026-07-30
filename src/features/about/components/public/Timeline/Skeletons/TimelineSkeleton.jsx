import React from 'react';

export default function TimelineSkeleton() {
  return (
    <section className="w-full py-16 lg:py-16 lg:py-24 bg-gray-50 dark:bg-slate-950">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header Skeleton */}
        <div className="flex flex-col items-center text-center mb-20 animate-pulse">
          <div className="h-4 w-24 bg-gray-200 dark:bg-slate-800 rounded mb-4" />
          <div className="h-10 w-64 bg-gray-200 dark:bg-slate-800 rounded mb-4" />
          <div className="h-4 w-full max-w-xl bg-gray-200 dark:bg-slate-800 rounded" />
        </div>

        {/* Timeline Line Skeleton */}
        <div className="relative">
          <div className="absolute left-8 md:left-1/2 md:-ml-px top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-slate-800 animate-pulse" />
          
          <div className="space-y-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`relative flex items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Center Node */}
                <div className="absolute left-8 md:left-1/2 -ml-3 w-6 h-6 bg-gray-200 dark:bg-slate-800 rounded-full animate-pulse" />
                
                {/* Content Card Skeleton */}
                <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 h-48 animate-pulse shadow-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
