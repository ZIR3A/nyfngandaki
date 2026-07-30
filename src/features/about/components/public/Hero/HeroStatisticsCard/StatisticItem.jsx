'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export default function StatisticItem({ label, value, icon, delay = 0 }) {
  // A simple counter effect using framer-motion springs
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
  const suffix = value.replace(/[0-9]/g, '');
  
  const [hasMounted, setHasMounted] = useState(false);
  const springValue = useSpring(0, { stiffness: 50, damping: 20 });
  const displayValue = useTransform(springValue, (current) => Math.floor(current));

  useEffect(() => {
    setHasMounted(true);
    const timeout = setTimeout(() => {
      springValue.set(numericValue);
    }, delay * 1000 + 500); // Wait for entrance animation + delay
    return () => clearTimeout(timeout);
  }, [numericValue, springValue, delay]);

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div variants={itemVariants} className="flex items-center gap-3">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-white flex items-baseline">
          {hasMounted ? <motion.span>{displayValue}</motion.span> : <span>0</span>}
          <span>{suffix}</span>
        </div>
        <div className="text-xs text-white/60 uppercase tracking-wider">{label}</div>
      </div>
    </motion.div>
  );
}
