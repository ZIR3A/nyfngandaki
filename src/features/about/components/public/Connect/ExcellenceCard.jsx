'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Users, Lightbulb, CheckCircle, TrendingUp } from 'lucide-react';

const iconMap = {
  star: Star,
  shield: Shield,
  users: Users,
  lightbulb: Lightbulb,
  check: CheckCircle,
  trending: TrendingUp
};

export default function ExcellenceCard({ excellence, locale = 'en' }) {
  const title = excellence.title?.[locale];
  const description = excellence.description?.[locale];
  
  if (!title) return null;

  const IconComponent = iconMap[excellence.icon?.toLowerCase()] || Star;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -8 }}
      className="group bg-white dark:bg-slate-900/60 backdrop-blur-md border border-gray-100 dark:border-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="w-14 h-14 bg-primary-blue/10 dark:bg-primary-blue/20 text-primary-blue rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-blue group-hover:text-white transition-all duration-300">
        <IconComponent size={28} strokeWidth={1.5} />
      </div>

      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
        {title}
      </h3>
      
      {description && (
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
          {description}
        </p>
      )}
    </motion.div>
  );
}
