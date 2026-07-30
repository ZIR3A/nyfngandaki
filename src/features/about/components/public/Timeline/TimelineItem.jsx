'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TimelineYear from './TimelineYear';
import TimelineCard from './TimelineCard';

export default function TimelineItem({ item, index, locale = 'en' }) {
  // Alternating layout logic for Desktop
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''} group`}>
      
      {/* Central Node / Year Badge */}
      <TimelineYear year={item.year} />
      
      {/* Content Container */}
      <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-12 lg:pr-16' : 'md:pl-12 lg:pl-16'}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <TimelineCard item={item} locale={locale} isEven={isEven} />
        </motion.div>
      </div>
    </div>
  );
}
