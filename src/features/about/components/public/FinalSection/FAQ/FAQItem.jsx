'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQItem({ item, isOpen, onClick, locale = 'en' }) {
  const question = item.question?.[locale];
  const answer = item.answer?.[locale];

  if (!question || !answer) return null;

  return (
    <div className="border border-gray-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden mb-4 shadow-sm hover:border-gray-300 dark:hover:border-slate-700 transition-colors">
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-blue"
      >
        <span className={`font-semibold text-lg md:text-xl transition-colors ${isOpen ? 'text-primary-blue' : 'text-gray-900 dark:text-white'}`}>
          {question}
        </span>
        <div className={`flex-shrink-0 ml-4 p-2 rounded-full transition-transform duration-300 ${isOpen ? 'bg-blue-50 dark:bg-slate-800 rotate-180' : 'bg-gray-50 dark:bg-slate-800'}`}>
          <ChevronDown className={`h-5 w-5 ${isOpen ? 'text-primary-blue' : 'text-gray-500'}`} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-6 pb-6 pt-0 text-gray-600 dark:text-gray-400 prose dark:prose-invert max-w-none">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
