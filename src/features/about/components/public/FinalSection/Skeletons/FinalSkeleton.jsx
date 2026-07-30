import React from 'react';

export default function FinalSkeleton() {
  return (
    <div className="w-full animate-pulse bg-white dark:bg-slate-950 py-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Partners Grid Skeleton */}
        <div className="mb-24">
          <div className="h-10 w-64 bg-gray-200 dark:bg-slate-800 rounded mx-auto mb-16" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-48 w-full bg-gray-200 dark:bg-slate-800 rounded-2xl" />
            ))}
          </div>
        </div>
        
        {/* FAQ Skeleton */}
        <div className="max-w-[1024px] mx-auto mb-24">
          <div className="h-10 w-64 bg-gray-200 dark:bg-slate-800 rounded mx-auto mb-16" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 w-full bg-gray-200 dark:bg-slate-800 rounded-2xl mb-4" />
          ))}
        </div>

        {/* CTA Skeleton */}
        <div className="h-[400px] w-full bg-gray-200 dark:bg-slate-800 rounded-[2.5rem] mb-24" />
        
      </div>
    </div>
  );
}
