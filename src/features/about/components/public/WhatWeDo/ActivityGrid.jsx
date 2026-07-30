'use client';

import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CategoryFilter from './CategoryFilter';
import ActivityCard from './ActivityCard';

export default function ActivityGrid({ activities, locale = 'en' }) {
  const [activeCategory, setActiveCategory] = useState('All');

  // Extract unique categories from the activities array
  const categories = useMemo(() => {
    if (!activities) return [];
    const uniqueCats = [];
    const seen = new Set();
    
    activities.forEach(act => {
      const cat = act.category;
      if (!cat) return;
      const catKey = typeof cat === 'string' ? cat : cat.en;
      if (catKey && !seen.has(catKey)) {
        seen.add(catKey);
        uniqueCats.push(cat);
      }
    });
    return uniqueCats;
  }, [activities]);

  // Filter activities based on active category
  const filteredActivities = useMemo(() => {
    if (!activities) return [];
    if (activeCategory === 'All') return activities;
    return activities.filter(act => {
      const catKey = typeof act.category === 'string' ? act.category : act.category?.en;
      return catKey === activeCategory;
    });
  }, [activities, activeCategory]);

  if (!activities || activities.length === 0) return null;

  return (
    <div className="w-full">
      
      {/* Interactive Filtering */}
      {categories.length > 0 && (
        <CategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
          locale={locale} 
        />
      )}

      {/* Masonry-style Animated Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredActivities.map((activity) => (
            <ActivityCard 
              key={activity._id || activity.id || Math.random()} 
              activity={activity} 
              locale={locale} 
            />
          ))}
        </AnimatePresence>
      </motion.div>
      
      {/* Graceful empty state for empty filter results */}
      {filteredActivities.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          {locale === 'np' ? 'à¤•à¥à¤¨à¥ˆ à¤—à¤¤à¤¿à¤µà¤¿à¤§à¤¿ à¤«à¥‡à¤²à¤¾ à¤ªà¤°à¥‡à¤¨à¥¤' : 'No activities found in this category.'}
        </div>
      )}
    </div>
  );
}
