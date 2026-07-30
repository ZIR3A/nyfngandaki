import React from 'react';

export default function WhatWeDoSkeleton() {
  return (
    <section className="w-full py-16 lg:py-16 lg:py-24 bg-gray-50 dark:bg-slate-950">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 animate-pulse">
        
        {/* Header Skeleton */}
        <div className="flex flex-col items-center mb-16">
          <div className="h-4 w-24 bg-gray-200 dark:bg-slate-800 rounded mb-4" />
          <div className="h-10 w-64 bg-gray-200 dark:bg-slate-800 rounded mb-4" />
          <div className="h-4 w-full max-w-lg bg-gray-200 dark:bg-slate-800 rounded" />
        </div>

        {/* Featured Programs Skeleton (3 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 md:h-[400px] w-full bg-gray-200 dark:bg-slate-800 rounded-3xl" />
          ))}
        </div>

        {/* Filter Pills Skeleton */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 w-24 bg-gray-200 dark:bg-slate-800 rounded-full" />
          ))}
        </div>

        {/* Activities Grid Skeleton (4 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-64 bg-gray-200 dark:bg-slate-800 rounded-2xl" />
          ))}
        </div>

      </div>
    </section>
  );
}
