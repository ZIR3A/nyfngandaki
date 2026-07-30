'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({ label, heading, centered = false }) {
  if (!heading) return null;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className={`mb-12 ${centered ? 'text-center flex flex-col items-center' : ''}`}>
      {label && (
        <motion.div 
          variants={itemVariants}
          className={`flex items-center gap-3 mb-4 ${centered ? 'justify-center' : ''}`}
        >
          <div className="h-px w-8 bg-primary-red" />
          <span className="text-sm font-bold tracking-widest text-primary-red uppercase">
            {label}
          </span>
          {centered && <div className="h-px w-8 bg-primary-red" />}
        </motion.div>
      )}
      <motion.h2 
        variants={itemVariants}
        className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 dark:text-white leading-tight"
      >
        {heading}
      </motion.h2>
    </div>
  );
}
