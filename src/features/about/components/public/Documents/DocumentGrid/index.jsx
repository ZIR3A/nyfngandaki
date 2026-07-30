'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DocumentCard from './DocumentCard';

export default function DocumentGrid({ documents, locale = 'en' }) {
  const isNp = locale === 'np';

  if (!documents || documents.length === 0) {
    return (
      <div className="w-full py-16 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          {isNp ? 'à¤•à¥à¤¨à¥ˆ à¤•à¤¾à¤—à¤œà¤¾à¤¤ à¤«à¥‡à¤²à¤¾ à¤ªà¤°à¥‡à¤¨à¥¤' : 'No documents found matching your criteria.'}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      layout
      className="w-full max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-24"
    >
      <AnimatePresence mode="popLayout">
        {documents.map((doc) => (
          <DocumentCard key={doc._id} doc={doc} locale={locale} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
