'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, UserPlus, PhoneCall, Network } from 'lucide-react';
import Link from 'next/link';

export default function FinalCTA({ cta, locale = 'en' }) {
  if (!cta) return null;

  const isNp = locale === 'np';
  const heading = cta.heading?.[locale] || (isNp ? 'हामीसँग जोडिनुहोस्' : 'Become a Part of Our Journey');
  const description = cta.description?.[locale] || (isNp ? 'युवा सशक्तीकरण र नेतृत्व विकासको अभियानमा हामीसँग हातेमालो गर्नुहोस्।' : 'Join our mission to empower youth and build a stronger nation.');

  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-16 mb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full rounded-3xl bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-8 md:p-12 lg:p-16 text-center flex flex-col items-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
          {heading}
        </h2>
        <p className="text-base md:text-lg text-gray-650 dark:text-gray-300 mb-10 max-w-2xl leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href={`/${locale}/contact`}>
            <button className="w-full sm:w-auto group flex items-center justify-center gap-2 px-8 py-4 bg-primary-blue hover:bg-primary-blue/90 text-white font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-primary-blue/20 hover:-translate-y-0.5">
              <UserPlus className="w-5 h-5" />
              <span>{isNp ? 'सदस्य बन्नुहोस्' : 'Become a Member'}</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
            </button>
          </Link>
          
          <Link href={`/${locale}/contact`}>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-205 font-bold rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-750 transition-all duration-300 hover:-translate-y-0.5">
              <PhoneCall className="w-5 h-5 text-primary-red" />
              <span>{isNp ? 'सम्पर्क गर्नुहोस्' : 'Contact Us'}</span>
            </button>
          </Link>

          <Link href={`/${locale}/organization`}>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-205 font-bold rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-750 transition-all duration-300 hover:-translate-y-0.5">
              <Network className="w-5 h-5 text-primary-blue" />
              <span>{isNp ? 'सांगठनिक संरचना' : 'Organization Structure'}</span>
            </button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
