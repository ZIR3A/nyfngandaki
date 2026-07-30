'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, BookOpen, Globe, Award, Heart } from 'lucide-react';

const iconMap = {
  target: Target,
  users: Users,
  book: BookOpen,
  globe: Globe,
  award: Award,
  heart: Heart
};

export default function WhyJoinCard({ reason, locale = 'en' }) {
  const title = reason.title?.[locale];
  const description = reason.description?.[locale];
  
  if (!title) return null;

  const IconComponent = iconMap[reason.icon?.toLowerCase()] || Target;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 }
      }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
    >
      {/* Soft gradient background highlight on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex items-start gap-4 mb-4 relative z-10">
        <div className="w-12 h-12 flex-shrink-0 bg-red-50 dark:bg-red-900/20 text-primary-red rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
          <IconComponent size={24} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white pt-2">
          {title}
        </h3>
      </div>
      
      {description && (
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm relative z-10">
          {description}
        </p>
      )}
    </motion.div>
  );
}
