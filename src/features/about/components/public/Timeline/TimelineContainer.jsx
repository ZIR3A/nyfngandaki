'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import TimelineItem from './TimelineItem';

export default function TimelineContainer({ timelineItems, locale = 'en' }) {
  const containerRef = useRef(null);

  // Track scroll progress within this specific container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Create a smooth spring animation for the growing line
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative max-w-[1200px] mx-auto px-6 md:px-12">
      
      {/* The Background Line (Static) */}
      <div className="absolute left-11 md:left-1/2 md:-ml-px top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-slate-800" />
      
      {/* The Animated Progress Line */}
      <motion.div 
        style={{ scaleY, transformOrigin: "top" }}
        className="absolute left-11 md:left-1/2 md:-ml-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-blue via-primary-red to-primary-blue z-10"
      />

      <div className="space-y-12 md:space-y-24">
        {timelineItems.map((item, index) => (
          <TimelineItem 
            key={item._id || index} 
            item={item} 
            index={index} 
            locale={locale} 
          />
        ))}
      </div>
    </div>
  );
}
