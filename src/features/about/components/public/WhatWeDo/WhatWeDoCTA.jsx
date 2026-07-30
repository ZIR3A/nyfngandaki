'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function WhatWeDoCTA({ locale = 'en' }) {
  const isNp = locale === 'np';
  const heading = isNp ? 'à¤¹à¤¾à¤®à¥à¤°à¤¾ à¤•à¤¾à¤°à¥à¤¯à¤•à¥à¤°à¤®à¤¹à¤°à¥‚à¤®à¤¾ à¤¸à¤¾à¤®à¥‡à¤² à¤¹à¥à¤¨à¥à¤¹à¥‹à¤¸à¥' : 'Get Involved with NYFN';
  const description = isNp 
    ? 'à¤¹à¤¾à¤®à¥à¤°à¥‹ à¤¸à¤®à¤¾à¤œ à¤ªà¤°à¤¿à¤µà¤°à¥à¤¤à¤¨à¤•à¥‹ à¤…à¤­à¤¿à¤¯à¤¾à¤¨à¤®à¤¾ à¤¸à¥à¤µà¤¯à¤‚à¤¸à¥‡à¤µà¤•à¤•à¥‹ à¤°à¥‚à¤ªà¤®à¤¾ à¤œà¥‹à¤¡à¤¿à¤¨à¥à¤¹à¥‹à¤¸à¥ à¥¤' 
    : 'Join our programs as a volunteer and make a real impact in the community.';
  const btnLabel = isNp ? 'à¤¸à¥à¤µà¤¯à¤‚à¤¸à¥‡à¤µà¤• à¤¬à¤¨à¥à¤¨à¥à¤¹à¥‹à¤¸à¥' : 'Become a Volunteer';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="mt-24 w-full bg-gradient-to-br from-primary-blue to-blue-900 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden"
    >
      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="relative z-10 max-w-2xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h3>
        <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed">
          {description}
        </p>
        
        <Link href={`/${locale}/contact`} passHref>
          <button className="inline-flex items-center gap-2 bg-primary-red hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
            {btnLabel} <ArrowRight size={20} />
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
