'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

export default function ObjectiveCard({ objective, index, locale = 'en' }) {
  const title = objective?.title?.[locale];
  const description = objective?.description?.[locale];

  if (!title) return null;

  const Icon = objective?.iconId?.url ? (
    <img src={objective.iconId.url} alt={title} className="w-8 h-8 object-contain" />
  ) : (
    <Target className="w-8 h-8 text-primary-red" />
  );

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -5 }}
      className="h-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 group"
    >
      <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-6 group-hover:bg-primary-red transition-colors duration-300">
        <div className="group-hover:text-white transition-colors duration-300">
          {Icon}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-red dark:group-hover:text-red-400 transition-colors">
        {title}
      </h3>
      
      {description && (
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
          {description}
        </p>
      )}
    </motion.div>
  );
}
