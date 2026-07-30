'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function CategoryFilter({ categories, activeCategory, setActiveCategory, locale = 'en' }) {
  const isNp = locale === 'np';
  const allLabel = isNp ? 'à¤¸à¤¬à¥ˆ' : 'All';

  if (!categories || categories.length === 0) return null;

  return (
    <div className="w-full flex justify-center mb-10 overflow-x-auto hide-scrollbar pb-4 px-4">
      <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-full shadow-sm border border-gray-100 dark:border-slate-800">
        
        {/* 'All' Button */}
        <button
          role="tab"
          aria-selected={activeCategory === 'All'}
          onClick={() => setActiveCategory('All')}
          className={`relative px-5 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap z-10 ${
            activeCategory === 'All' 
              ? 'text-white' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          {activeCategory === 'All' && (
            <motion.div
              layoutId="activeFilterBubble"
              className="absolute inset-0 bg-primary-blue rounded-full -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {allLabel}
        </button>

        {/* Dynamic Category Buttons */}
        {categories.map((category) => {
          const catKey = typeof category === 'string' ? category : category?.en;
          const catLabel = typeof category === 'string' ? category : (category?.[locale] || category?.en);

          return (
            <button
              key={catKey}
              role="tab"
              aria-selected={activeCategory === catKey}
              onClick={() => setActiveCategory(catKey)}
              className={`relative px-5 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap z-10 ${
                activeCategory === catKey 
                  ? 'text-white' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {activeCategory === catKey && (
                <motion.div
                  layoutId="activeFilterBubble"
                  className="absolute inset-0 bg-primary-blue rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {catLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}
