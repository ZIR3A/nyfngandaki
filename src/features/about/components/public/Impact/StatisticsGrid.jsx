'use client';

import React from 'react';
import { motion } from 'framer-motion';
import StatisticCard from './StatisticCard';

export default function StatisticsGrid({ statistics, locale = 'en' }) {
  if (!statistics || statistics.length === 0) return null;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1 }
        }
      }}
      className="w-full max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
    >
      {statistics.map((stat, index) => (
        <StatisticCard key={stat._id || index} stat={stat} locale={locale} />
      ))}
    </motion.div>
  );
}
