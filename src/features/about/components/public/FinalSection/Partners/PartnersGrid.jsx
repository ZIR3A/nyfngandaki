'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../../Strategy/Shared/SectionHeading';
import PartnerCard from './PartnerCard';

export default function PartnersGrid({ partners, locale = 'en' }) {
  if (!partners || partners.length === 0) return null;

  const isNp = locale === 'np';
  const label = isNp ? 'à¤¹à¤¾à¤®à¥à¤°à¤¾ à¤¸à¤¾à¤à¥‡à¤¦à¤¾à¤°à¤¹à¤°à¥‚' : 'Our Partners';
  const heading = isNp ? 'à¤µà¤¿à¤¶à¥à¤µà¤¸à¤¨à¥€à¤¯ à¤¸à¤¹à¤•à¤¾à¤°à¥à¤¯à¤¹à¤°à¥‚' : 'Strategic Collaborations & Partners';

  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-16 lg:py-24">
      
      <div className="text-center mb-16">
        <SectionHeading label={label} heading={heading} centered={true} />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, staggerChildren: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
      >
        {partners.map((partner, index) => (
          <motion.div
            key={partner._id || index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <PartnerCard partner={partner} locale={locale} />
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}
