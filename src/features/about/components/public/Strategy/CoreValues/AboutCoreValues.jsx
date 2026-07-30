'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../Shared/SectionHeading';
import CoreValueCard from './CoreValueCard';

export default function AboutCoreValues({ coreValues, locale = 'en' }) {
  if (!coreValues || coreValues.length === 0) {
    return null;
  }

  const isNp = locale === 'np';
  const label = isNp ? 'मूल्य मान्यताहरू' : 'Core Values';
  const heading = isNp ? 'हाम्रा सिद्धान्त र मान्यताहरू' : 'What We Stand For';

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto py-16 lg:py-16 lg:py-24">
      <SectionHeading label={label} heading={heading} centered={true} />
      
      <motion.div 
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {coreValues.map((coreValue, index) => (
          <CoreValueCard 
            key={coreValue._id || index} 
            coreValue={coreValue} 
            index={index} 
            locale={locale} 
          />
        ))}
      </motion.div>
    </div>
  );
}
