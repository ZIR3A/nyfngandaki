'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function CategoryFilter({ categories, activeCategory, setActiveCategory, locale = 'en' }) {
  const isNp = locale === 'np';
  const allLabel = isNp ? 'à¤¸à¤¬à¥ˆ' : 'All';

  // Extract unique categories from strings or objects
  const uniqueCategories = Array.from(new Set(categories.map(c => typeof c === 'string' ? c : c?.[locale] || '')));
  // Filter out any falsy values
  const validCategories = uniqueCategories.filter(Boolean);

  if (validCategories.length === 0) return null;

  return (
    <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 -mx-6 px-6 md:mx-0 md:px-0">
      <button
        onClick={() => setActiveCategory('All')}
        className={`relative px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
          activeCategory === 'All' 
            ? 'text-white' 
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
        }`}
      >
        {activeCategory === 'All' && (
          <motion.div
            layoutId="category-bubble-docs"
            className="absolute inset-0 bg-primary-blue rounded-full -z-10"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10">{allLabel}</span>
      </button>

      {validCategories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`relative px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
            activeCategory === category 
              ? 'text-white' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800'
          }`}
        >
          {activeCategory === category && (
            <motion.div
              layoutId="category-bubble-docs"
              className="absolute inset-0 bg-primary-blue rounded-full -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{category}</span>
        </button>
      ))}
    </div>
  );
}
