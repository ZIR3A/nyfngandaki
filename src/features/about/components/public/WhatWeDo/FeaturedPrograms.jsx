'use client';

import React from 'react';
import ProgramCard from './ProgramCard';

export default function FeaturedPrograms({ programs, locale = 'en' }) {
  if (!programs || programs.length === 0) return null;

  return (
    <div className="w-full mb-24 relative">
      {/* 
        Mobile: Horizontal Scroll Snap Slider 
        Tablet: 2 Columns
        Desktop: 3 Columns
      */}
      <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 md:pb-0 snap-x snap-mandatory hide-scrollbar">
        {programs.map((program, index) => (
          <ProgramCard 
            key={program._id || index} 
            program={program} 
            locale={locale} 
            index={index} 
          />
        ))}
      </div>
      
      {/* Fade out edges for mobile slider indicator */}
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 dark:from-slate-950 to-transparent pointer-events-none md:hidden" />
    </div>
  );
}
