'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users, LayoutGrid } from 'lucide-react'; 

export default function ActivityCard({ activity, locale = 'en' }) {
  const title = activity.title?.[locale];
  const description = activity.shortDescription?.[locale] || activity.description?.[locale];
  
  if (!title) return null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-900/60 backdrop-blur-md border border-gray-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
    >
      {/* Optional Top Image */}
      {activity.imageId && (
        <div className="relative w-full h-40 overflow-hidden">
          <Image
            src={activity.imageId.url}
            alt={activity.imageId.alt || title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="p-6 flex-grow flex flex-col">
        {/* Icon (If no image, or as a badge) */}
        {!activity.imageId && (
          <div className="w-12 h-12 bg-primary-blue/10 dark:bg-primary-blue/20 text-primary-blue rounded-xl flex items-center justify-center mb-4">
            <LayoutGrid size={24} aria-hidden="true" />
          </div>
        )}

        <div className="flex items-center gap-2 mb-3">
          {activity.category && (
            <span className="text-xs font-semibold text-primary-red uppercase tracking-wider">
              {typeof activity.category === 'string' ? activity.category : (activity.category[locale] || activity.category.en)}
            </span>
          )}
        </div>

        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">
          {title}
        </h4>

        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {description}
          </p>
        )}

        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          {activity.audience && (
            <span className="flex items-center gap-1.5"><Users size={14} /> {typeof activity.audience === 'string' ? activity.audience : (activity.audience[locale] || activity.audience.en)}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
