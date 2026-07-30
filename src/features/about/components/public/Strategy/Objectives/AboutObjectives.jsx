'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../Shared/SectionHeading';
import ObjectiveCard from './ObjectiveCard';

export default function AboutObjectives({ objectives, locale = 'en' }) {
  if (!objectives || objectives.length === 0) {
    return null;
  }

  const isNp = locale === 'np';
  const label = isNp ? 'उद्देश्यहरू' : 'Our Objectives';
  const heading = isNp ? 'हाम्रा मुख्य उद्देश्यहरू' : 'What We Aim To Achieve';
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
        {objectives.map((objective, index) => (
          <ObjectiveCard 
            key={objective._id || index} 
            objective={objective} 
            index={index} 
            locale={locale} 
          />
        ))}
      </motion.div>
    </div>
  );
}
