'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../Strategy/Shared/SectionHeading';
import FeaturedPrograms from './FeaturedPrograms';
import ActivityGrid from './ActivityGrid';
import WhatWeDoCTA from './WhatWeDoCTA';

export default function WhatWeDoClient({ data, locale = 'en' }) {
  const { programs, activities } = data;



  const isNp = locale === 'np';
  const label = isNp ? 'हामी के गर्छौं' : 'What We Do';
  const heading = isNp ? 'हाम्रा मुख्य कार्यक्रम र गतिविधिहरू' : 'Programs & Initiatives';
  const description = isNp 
    ? 'हाम्रा मुख्य पहलहरू जसले समाजमा सकारात्मक परिवर्तन ल्याउँछन्।' 
    : 'Discover our primary initiatives driving positive change across the province.';
  // Separate featured programs
  const featuredPrograms = (programs || []).filter(p => p.isFeatured);

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
      >
        <SectionHeading label={label} heading={heading} centered={true} />
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-normal mt-[-1.5rem]">
          {description}
        </p>
      </motion.div>

      {/* Featured Programs Section */}
      <FeaturedPrograms programs={featuredPrograms} locale={locale} />

      {/* Interactive Activities Grid */}
      <ActivityGrid activities={activities} locale={locale} />

      {/* Final Call To Action */}
      <WhatWeDoCTA locale={locale} />
      
    </div>
  );
}
