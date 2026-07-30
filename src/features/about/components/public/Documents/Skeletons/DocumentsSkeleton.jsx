import React from 'react';

export default function DocumentsSkeleton() {
  return (
    <section className="w-full py-16 lg:py-16 lg:py-24 bg-gray-50 dark:bg-slate-950">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 animate-pulse">
        
        {/* Header Skeleton */}
        <div className="flex flex-col items-center mb-16">
          <div className="h-4 w-32 bg-gray-200 dark:bg-slate-800 rounded mb-4" />
          <div className="h-10 w-64 bg-gray-200 dark:bg-slate-800 rounded mb-4" />
          <div className="h-4 w-full max-w-lg bg-gray-200 dark:bg-slate-800 rounded" />
        </div>

        {/* Featured Constitution Skeleton */}
        <div className="w-full h-[400px] bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl mb-20 flex flex-col md:flex-row">
          <div className="w-full md:w-[30%] h-full bg-gray-200 dark:bg-slate-800 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none" />
          <div className="p-8 md:p-12 w-full md:w-[70%] flex flex-col justify-center">
            <div className="h-8 w-1/2 bg-gray-200 dark:bg-slate-800 rounded mb-4" />
            <div className="h-4 w-full bg-gray-200 dark:bg-slate-800 rounded mb-2" />
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-slate-800 rounded mb-8" />
            <div className="flex gap-4">
               <div className="h-12 w-32 bg-gray-200 dark:bg-slate-800 rounded-lg" />
               <div className="h-12 w-32 bg-gray-200 dark:bg-slate-800 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Controls Skeleton */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-12">
           <div className="h-12 w-full md:w-96 bg-gray-200 dark:bg-slate-800 rounded-lg" />
           <div className="h-12 w-full md:w-1/2 bg-gray-200 dark:bg-slate-800 rounded-lg" />
        </div>

        {/* Grids Skeleton (3 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-40 w-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                 <div className="h-12 w-12 bg-gray-200 dark:bg-slate-800 rounded-lg flex-shrink-0" />
                 <div className="w-full">
                    <div className="h-6 w-3/4 bg-gray-200 dark:bg-slate-800 rounded mb-2" />
                    <div className="h-4 w-1/2 bg-gray-200 dark:bg-slate-800 rounded" />
                 </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
