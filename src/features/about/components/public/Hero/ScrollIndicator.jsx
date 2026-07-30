'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function ScrollIndicator() {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <motion.button
      onClick={scrollToNext}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 p-2 rounded-full text-white/70 hover:text-white bg-black/10 hover:bg-black/20 backdrop-blur-sm border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
      aria-label="Scroll to next section"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </motion.button>
  );
}
