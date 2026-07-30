'use client';

import React from 'react';
import { motion } from 'framer-motion';
import WhoWeAreImage from './WhoWeAreImage';
import WhoWeAreContent from './WhoWeAreContent';
import FeatureHighlightGrid from './FeatureHighlightGrid';
import WhoWeAreCTA from './WhoWeAreCTA';

export default function WhoWeAreClient({ data, locale }) {
  const { organization, coreValues, cta, hero } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      
      {/* Left Column: Visual Story */}
      <WhoWeAreImage 
        media={
          organization?.imageId
            ? { url: organization.imageId.publicUrl, alt: organization.imageId.altText || 'Who We Are' }
            : null
        }
        badgeData={{}} // Optional mapping from CMS if a specific badge object exists
        locale={locale} 
      />

      {/* Right Column: Organizational Story */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col justify-center py-8 lg:py-0"
      >
        <WhoWeAreContent 
          label={organization?.sectionLabel?.[locale] || (locale === 'np' ? 'हाम्रो बारेमा' : 'Who We Are')}
          heading={organization?.heading?.[locale] || (locale === 'np' ? 'राष्ट्रिय युवा संघ नेपाल गण्डकी प्रदेश कमिटी' : 'National Youth Federation Nepal Gandaki Province Committee')}
          description={organization?.whoWeAre?.[locale]}
          secondaryDescription={organization?.secondaryDescription?.[locale]}
          locale={locale}
        />

        {/* Feature Grid mapping CoreValues or custom Highlights */}
        <FeatureHighlightGrid features={coreValues} locale={locale} />

        <WhoWeAreCTA ctaData={cta} locale={locale} />
      </motion.div>
    </div>
  );
}
