'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

export default function CoreValueCard({ coreValue, index, locale = 'en' }) {
  const title = coreValue?.title?.[locale];
  const description = coreValue?.description?.[locale];

  if (!title) return null;

  const Icon = coreValue?.iconId?.url ? (
    <img src={coreValue.iconId.url} alt={title} className="w-8 h-8 object-contain" />
  ) : (
    <Award className="w-8 h-8" />
  );

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="relative h-full bg-slate-50 dark:bg-white/5 backdrop-blur-lg border border-gray-100 dark:border-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden z-10"
    >
      {/* Subtle glow effect in dark mode on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-500/0 to-blue-500/5 dark:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />

      <div className="flex items-center gap-5 mb-6">
        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-primary-blue group-hover:bg-primary-blue group-hover:text-white transition-colors duration-300">
          {Icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-blue dark:group-hover:text-blue-300 transition-colors">
          {title}
        </h3>
      </div>
      
      {description && (
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
