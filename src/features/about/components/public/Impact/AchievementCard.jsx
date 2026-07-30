'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, Trophy, Star } from 'lucide-react';

const iconMap = {
  award: Award,
  trophy: Trophy,
  star: Star,
};

export default function AchievementCard({ achievement, locale = 'en', index }) {
  const title = achievement.title?.[locale];
  const description = achievement.description?.[locale];
  
  if (!title) return null;

  const IconComponent = iconMap[achievement.icon?.toLowerCase()] || Award;
  // Create a staggered masonry look by pushing even items down slightly on desktop
  const isEven = index % 2 === 0;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -5 }}
      className={`relative group bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 ${!isEven ? 'lg:mt-12' : ''}`}
    >
      {/* Year Badge */}
      <div className="absolute -top-5 right-8 bg-gradient-to-r from-primary-blue to-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg border-2 border-white dark:border-slate-900 transform group-hover:scale-105 transition-transform">
        {achievement.year}
      </div>

      <div className="flex items-start gap-4 mb-4 mt-2">
        <div className="w-12 h-12 flex-shrink-0 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-500 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
          <IconComponent size={24} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white pt-2">
          {title}
        </h3>
      </div>

      {description && (
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
          {description}
        </p>
      )}

      {/* Optional Certificate Image */}
      {achievement.image?.url && (
        <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800 group-hover:shadow-md transition-shadow">
          <Image
            src={achievement.image.url}
            alt={achievement.image.alt || title}
            fill
            className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
    </motion.div>
  );
}
