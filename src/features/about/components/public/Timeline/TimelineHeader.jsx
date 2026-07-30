'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../Strategy/Shared/SectionHeading'; // Reuse SectionHeading

export default function TimelineHeader({ timelineData, locale = 'en' }) {


  const isNp = locale === 'np';
  const label = isNp ? 'हाम्रो यात्रा' : 'Our Journey';
  const heading = isNp ? 'हाम्रा मुख्य माइलस्टोनहरू' : 'Milestones & History';
  const description = isNp 
    ? 'हाम्रो स्थापना देखि आज सम्मको ऐतिहासिक यात्रा।' 
    : 'Explore the key events and milestones that shaped our organization.';
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20 px-6"
    >
      <SectionHeading label={label} heading={heading} centered={true} />
      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-normal mt-[-1.5rem]">
        {description}
      </p>
    </motion.div>
  );
}
