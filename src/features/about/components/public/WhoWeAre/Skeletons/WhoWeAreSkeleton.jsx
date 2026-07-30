import React from 'react';

export default function WhoWeAreSkeleton() {
  return (
    <section className="w-full py-16 lg:py-16 lg:py-24 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Side: Image Placeholder */}
        <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] bg-gray-200 dark:bg-slate-800 rounded-3xl animate-pulse overflow-hidden">
          {/* Floating Badge Placeholder */}
          <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-gray-300 dark:bg-slate-700 w-48 h-24 rounded-2xl opacity-60 backdrop-blur-md" />
        </div>

        {/* Right Side: Content Placeholder */}
        <div className="flex flex-col animate-pulse">
          {/* Section Label */}
          <div className="h-4 w-32 bg-gray-200 dark:bg-slate-800 rounded mb-6" />
          
          {/* Heading */}
          <div className="h-10 md:h-12 w-full max-w-lg bg-gray-200 dark:bg-slate-800 rounded mb-4" />
          <div className="h-10 md:h-12 w-4/5 max-w-md bg-gray-200 dark:bg-slate-800 rounded mb-8" />
          
          {/* Description */}
          <div className="space-y-3 mb-10">
            <div className="h-4 w-full bg-gray-200 dark:bg-slate-800 rounded" />
            <div className="h-4 w-full bg-gray-200 dark:bg-slate-800 rounded" />
            <div className="h-4 w-11/12 bg-gray-200 dark:bg-slate-800 rounded" />
            <div className="h-4 w-4/5 bg-gray-200 dark:bg-slate-800 rounded" />
          </div>

          {/* Feature Grid Placeholder */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 p-4 border border-gray-100 dark:border-slate-800 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-800 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-full bg-gray-200 dark:bg-slate-800 rounded" />
                  <div className="h-3 w-4/5 bg-gray-200 dark:bg-slate-800 rounded" />
                </div>
              </div>
            ))}
          </div>

          {/* CTA Placeholder */}
          <div className="h-12 w-40 bg-gray-200 dark:bg-slate-800 rounded-lg" />
        </div>
      </div>
    </section>
  );
}
