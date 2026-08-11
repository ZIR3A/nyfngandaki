'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function WhoWeAreCTA({ ctaData, locale = 'en' }) {
  if (!ctaData) return null;

  const isNp = locale === 'np';
  const primaryText = ctaData.title?.[locale] || (isNp ? 'थप जान्नुहोस्' : 'Explore Organization');
  let primaryLink = ctaData.link || `/${locale}/about/details`;

  // Force redirect to contact page if link is /join
  if (!primaryLink || primaryLink === '/join') {
    primaryLink = `/${locale}/contact`;
  } else if (primaryLink.startsWith('/') && !primaryLink.startsWith(`/${locale}`)) {
    primaryLink = `/${locale}${primaryLink}`;
  }

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      className="mt-6"
    >
      <Link 
        href={primaryLink}
        className="inline-flex items-center justify-center px-8 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 outline-none group"
      >
        <span>{primaryText}</span>
        <svg 
          className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </motion.div>
  );
}
