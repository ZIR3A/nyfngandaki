import React from 'react';

export default function HeroSkeleton() {
  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] lg:h-screen bg-gray-200 dark:bg-slate-800 animate-pulse overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      
      <div className="relative z-10 w-full h-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col justify-center">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-32 bg-gray-300 dark:bg-slate-700 rounded mb-6 opacity-60" />
        
        {/* Title Skeleton */}
        <div className="h-12 md:h-16 w-3/4 max-w-[600px] bg-gray-300 dark:bg-slate-700 rounded mb-4" />
        <div className="h-12 md:h-16 w-2/3 max-w-[500px] bg-gray-300 dark:bg-slate-700 rounded mb-6" />
        
        {/* Subtitle / Description Skeleton */}
        <div className="h-5 w-full max-w-[600px] bg-gray-300 dark:bg-slate-700 rounded mb-3 opacity-80" />
        <div className="h-5 w-5/6 max-w-[550px] bg-gray-300 dark:bg-slate-700 rounded mb-8 opacity-80" />
        
        {/* Buttons Skeleton */}
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="h-12 w-40 bg-gray-300 dark:bg-slate-700 rounded-md" />
          <div className="h-12 w-32 bg-gray-300 dark:bg-slate-700 rounded-md opacity-70" />
        </div>
      </div>

      {/* Floating Card Skeleton (Desktop) */}
      <div className="hidden lg:block absolute right-12 bottom-20 w-80 h-48 bg-gray-300 dark:bg-slate-700 rounded-xl opacity-60 backdrop-blur-md" />
    </div>
  );
}
