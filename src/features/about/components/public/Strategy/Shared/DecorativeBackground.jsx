'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function DecorativeBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10">
      {/* Top Left Blob */}
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 w-96 h-96 bg-primary-blue/5 rounded-full blur-[100px]"
      />
      
      {/* Bottom Right Blob */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/2 -right-40 w-[30rem] h-[30rem] bg-primary-red/5 rounded-full blur-[120px]"
      />
    </div>
  );
}
