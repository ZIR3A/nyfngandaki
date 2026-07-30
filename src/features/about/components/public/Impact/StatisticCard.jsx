'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, Target, Award, Globe, Heart, Shield, Zap } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

const iconMap = {
  users: Users,
  activity: Activity,
  target: Target,
  award: Award,
  globe: Globe,
  heart: Heart,
  shield: Shield,
  zap: Zap
};

export default function StatisticCard({ stat, locale = 'en' }) {
  const label = stat.label?.[locale];
  const description = stat.description?.[locale];
  
  if (!label || stat.value === undefined) return null;

  // Resolve Icon
  const IconComponent = iconMap[stat.icon?.toLowerCase()] || Activity;
  
  // Safe string parsing for prefix/suffix
  const prefix = stat.prefix || '';
  const suffix = stat.suffix || '';
  
  // Full screen-reader text
  const srText = `${prefix}${stat.value}${suffix} ${label}`;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-slate-900/60 backdrop-blur-md border border-gray-100 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
    >
      {/* Decorative Blur */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary-blue/5 dark:bg-primary-blue/10 rounded-full blur-2xl group-hover:bg-primary-red/10 transition-colors duration-500 pointer-events-none" />

      {/* Icon */}
      <div className="w-14 h-14 bg-blue-50 dark:bg-slate-800 text-primary-blue rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-blue group-hover:text-white transition-all duration-300 shadow-inner">
        <IconComponent size={28} strokeWidth={1.5} />
      </div>

      {/* Counter */}
      <div 
        className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight"
        aria-label={srText}
      >
        <AnimatedCounter 
          value={stat.value} 
          prefix={prefix} 
          suffix={suffix} 
          decimals={0} 
        />
      </div>

      {/* Label & Description */}
      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
        {label}
      </h4>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {description}
        </p>
      )}
    </motion.div>
  );
}
