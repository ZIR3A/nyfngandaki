'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';

export default function FeatureHighlightGrid({ features = [], locale = 'en' }) {
  if (!features || features.length === 0) return null;

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 mb-10"
      variants={{
        visible: {
          transition: { staggerChildren: 0.1 }
        }
      }}
    >
      {/* Typically, we map over coreValues or specific feature highlights */}
      {features.slice(0, 4).map((feature, index) => (
        <FeatureCard key={feature._id || index} cardData={feature} locale={locale} />
      ))}
    </motion.div>
  );
}
