'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../Shared/SectionHeading';

export default function AboutVision({ visionData, locale = 'en' }) {
  if (!visionData || (!visionData.heading?.[locale] && !visionData.description?.[locale])) {
    return null;
  }


  const isNp = locale === 'np';
  const label = visionData.sectionLabel?.[locale] || (isNp ? 'हाम्रो दृष्टिकोण' : 'Our Vision');
  const heading = visionData.heading?.[locale];
  const description = visionData.description?.[locale];

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.2 } }
      }}
      className="relative w-full max-w-[900px] mx-auto text-center py-16 lg:py-16 lg:py-24"
    >
      <SectionHeading label={label} heading={heading} centered={true} />
      
      {description && (
        <motion.p 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
          }}
          className="text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium"
        >
          &ldquo;{description}&rdquo;
        </motion.p>
      )}
    </motion.div>
  );
}
