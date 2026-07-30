'use client';

import React, { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

export default function AnimatedCounter({ 
  value, 
  prefix = '', 
  suffix = '', 
  duration = 2,
  decimals = 0
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        // Format the number with standard thousands separators
        const formattedNumber = Intl.NumberFormat('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(latest);
        
        ref.current.textContent = `${prefix}${formattedNumber}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix, decimals]);

  // Accessibility: Screen readers will read the final value immediately via aria-label on the parent
  return <span ref={ref} aria-hidden="true" />;
}
