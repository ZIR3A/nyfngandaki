'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ImpactCard from './ImpactCard';

export default function ImpactHighlightGrid({ highlights, locale = 'en' }) {
  if (!highlights || highlights.length === 0) return null;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15 }
        }
      }}
      className="w-full max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32"
    >
      {highlights.map((highlight, index) => (
        <ImpactCard key={highlight._id || index} highlight={highlight} locale={locale} />
      ))}
    </motion.div>
  );
}
