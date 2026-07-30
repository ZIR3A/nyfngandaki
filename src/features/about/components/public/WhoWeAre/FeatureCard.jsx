'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react'; // Default fallback icon

export default function FeatureCard({ cardData, locale = 'en' }) {
  const title = cardData?.title?.[locale];
  const description = cardData?.description?.[locale];
  
  if (!title) return null;

  // Use CMS icon if available, otherwise a generic Target icon
  const Icon = cardData?.iconId?.url ? (
    <img src={cardData.iconId.url} alt={title} className="w-6 h-6 object-contain" />
  ) : (
    <Target className="w-6 h-6" />
  );

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary-blue group-hover:bg-primary-blue group-hover:text-white transition-colors duration-300">
          {Icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary-blue dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
