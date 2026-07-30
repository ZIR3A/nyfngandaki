'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';

export default function WhoWeAreContent({ label, heading, description, secondaryDescription, locale = 'en' }) {
  const isNp = locale === 'np';

  const displayLabel = label;
  const displayHeading = heading;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div>
      <SectionLabel labelText={displayLabel} />
      
      <motion.h2 
        variants={itemVariants}
        className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 dark:text-white leading-tight mb-6 max-w-[650px]"
      >
        {displayHeading}
      </motion.h2>

      <motion.div variants={itemVariants} className="space-y-4">
        {description && (
          <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
            {description}
          </p>
        )}
        
        {secondaryDescription && (
          <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
            {secondaryDescription}
          </p>
        )}
      </motion.div>
    </div>
  );
}
