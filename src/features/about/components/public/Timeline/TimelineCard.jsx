'use client';

import React from 'react';
import TimelineMedia from './TimelineMedia';

export default function TimelineCard({ item, locale = 'en', isEven }) {
  const title = item.title?.[locale];
  const description = item.description?.[locale];
  
  if (!title) return null;

  return (
    <div className="group bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
      
      {/* Connector Arrow (Desktop Only) */}
      <div className={`hidden md:block absolute top-12 w-4 h-4 bg-white dark:bg-slate-900 border-t border-r border-gray-100 dark:border-slate-800 transform rotate-45 z-10 ${isEven ? '-left-2 border-b-0 border-l-0' : '-right-2 border-t-0 border-l-0'}`} />

      {item.imageId && (
        <TimelineMedia media={item.imageId} title={title} />
      )}
      
      <div className="p-6 md:p-8">
        <div className="md:hidden text-sm font-bold text-primary-red mb-2">
          {item.year}
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-blue dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
