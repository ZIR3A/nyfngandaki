'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ExcellenceCard from './ExcellenceCard';
import SectionHeading from '../Strategy/Shared/SectionHeading';

export default function ExcellenceGrid({ items, locale = 'en' }) {
  if (!items || items.length === 0) return null;

  const isNp = locale === 'np';
  const label = isNp ? 'à¤¹à¤¾à¤®à¥à¤°à¥‹ à¤ªà¥à¤°à¤¤à¤¿à¤¬à¤¦à¥à¤§à¤¤à¤¾' : 'Our Commitment';
  const heading = isNp ? 'à¤¸à¤‚à¤¸à¥à¤¥à¤¾à¤—à¤¤ à¤‰à¤¤à¥à¤•à¥ƒà¤·à¥à¤Ÿà¤¤à¤¾' : 'Organizational Excellence';

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 mb-32">
      <div className="mb-16">
        <SectionHeading label={label} heading={heading} centered={false} />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {items.map((item, index) => (
          <ExcellenceCard key={item._id || index} excellence={item} locale={locale} />
        ))}
      </motion.div>
    </div>
  );
}
