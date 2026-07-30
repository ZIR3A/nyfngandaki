'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function TimelineYear({ year }) {
  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
      className="absolute left-8 md:left-1/2 -ml-3 md:-ml-8 top-8 w-6 h-6 md:w-16 md:h-16 bg-primary-red text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-slate-950 z-20"
      aria-hidden="true"
    >
      <span className="hidden md:block font-bold text-lg tracking-wider">
        {year}
      </span>
    </motion.div>
  );
}
