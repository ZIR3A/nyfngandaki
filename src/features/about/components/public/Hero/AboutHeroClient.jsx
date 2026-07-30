'use client';

import React from 'react';
import { motion } from 'framer-motion';
import HeroBreadcrumb from './HeroBreadcrumb';
import HeroContent from './HeroContent';
import HeroButtons from './HeroButtons';
import HeroStatisticsCard from './HeroStatisticsCard';
import ScrollIndicator from './ScrollIndicator';

export default function AboutHeroClient({ data, locale }) {
  const { hero, organization, cta, statistics } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div className="relative z-10 w-full h-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col justify-center min-h-[80vh] lg:h-screen">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full"
      >
        <HeroBreadcrumb locale={locale} />
        
        <HeroContent heroData={hero} orgData={organization} locale={locale} />
        
        <HeroButtons ctaData={cta} locale={locale} />
      </motion.div>

      {/* Statistics Card (Desktop floating) */}
      <HeroStatisticsCard statistics={statistics} locale={locale} />
      
      {/* Scroll Down Indicator */}
      <ScrollIndicator />
    </div>
  );
}
