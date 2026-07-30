'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Activity, Star, CheckCircle, Shield } from 'lucide-react';

const iconMap = {
  star: Star,
  check: CheckCircle,
  shield: Shield,
  activity: Activity,
};

export default function ImpactCard({ highlight, locale = 'en' }) {
  const title = highlight.title?.[locale];
  const description = highlight.description?.[locale];
  
  if (!title) return null;

  const IconComponent = iconMap[highlight.icon?.toLowerCase()] || Activity;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 }
      }}
      whileHover={{ y: -8 }}
      className="group bg-white dark:bg-slate-900/60 backdrop-blur-md border border-gray-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col h-full"
    >
      {/* Optional Top Image */}
      {highlight.image?.url && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={highlight.image.url}
            alt={highlight.image.alt || title}
            fill
            className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      <div className="p-8 flex-grow flex flex-col">
        {!highlight.image?.url && (
          <div className="w-12 h-12 bg-primary-red/10 text-primary-red rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-red group-hover:text-white transition-colors duration-300">
            <IconComponent size={24} />
          </div>
        )}

        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {title}
        </h3>
        
        {description && (
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
