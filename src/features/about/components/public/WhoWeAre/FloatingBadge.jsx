'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

export default function FloatingBadge({ title, subtitle, icon, delay = 0.5 }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="absolute -bottom-6 -right-6 lg:-right-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/20 dark:border-slate-700/50 p-4 md:p-6 rounded-2xl shadow-xl flex items-center gap-4 z-20"
    >
      <div className="flex-shrink-0 w-12 h-12 bg-primary-blue text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
        {icon || <Award className="w-6 h-6" />}
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white leading-none mb-1">
          {title}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wide">
          {subtitle}
        </div>
      </div>
    </motion.div>
  );
}
