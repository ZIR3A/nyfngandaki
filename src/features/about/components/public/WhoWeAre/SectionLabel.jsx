'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function SectionLabel({ labelText }) {
  if (!labelText) return null;

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
      }}
      className="flex items-center gap-3 mb-4"
    >
      <div className="h-px w-8 bg-primary-red" />
      <span className="text-sm font-bold tracking-widest text-primary-red uppercase">
        {labelText}
      </span>
    </motion.div>
  );
}
