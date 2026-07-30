'use client';

import React from 'react';
import { motion } from 'framer-motion';
import StatisticItem from './StatisticItem';
import { Users, MapPin, Target, Award } from 'lucide-react'; // Example icons

export default function HeroStatisticsCard({ statistics, locale = 'en' }) {
  if (!statistics || statistics.length === 0) return null;

  // We map generic Lucide icons if custom media isn't available, or rely on CMS icon uploads
  const getFallbackIcon = (index) => {
    const icons = [<Users key={0} />, <MapPin key={1} />, <Target key={2} />, <Award key={3} />];
    return icons[index % icons.length];
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
      className="hidden lg:block absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 w-80 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 z-20"
    >
      <div className="space-y-6">
        {statistics.slice(0, 4).map((stat, index) => (
          <StatisticItem 
            key={stat._id || index}
            label={stat.title?.[locale]}
            value={stat.value}
            icon={stat.iconId ? <img src={stat.iconId.url} alt="icon" className="w-5 h-5" /> : getFallbackIcon(index)}
            delay={0.2 * index}
          />
        ))}
      </div>
    </motion.div>
  );
}
