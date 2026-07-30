'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Download, ExternalLink, FileText, HardDrive, Calendar } from 'lucide-react';

export default function DocumentCard({ doc, locale = 'en' }) {
  const isNp = locale === 'np';
  const title = doc.title?.[locale];
  const description = doc.description?.[locale];
  const category = doc.category?.[locale];
  const fileUrl = doc.file?.url;
  
  if (!title || !fileUrl) return null;

  const publishedDate = doc.publishedDate ? new Date(doc.publishedDate).toLocaleDateString(isNp ? 'ne-NP' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : null;
  const fileSizeStr = doc.fileSize ? `${(doc.fileSize / 1024 / 1024).toFixed(2)} MB` : '';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group bg-white dark:bg-slate-900/80 backdrop-blur-md border border-gray-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full relative overflow-hidden"
    >
      {/* Decorative Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue to-blue-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

      <div className="flex items-start gap-4 mb-4">
        {/* Thumbnail or Icon */}
        <div className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-800 flex items-center justify-center border border-gray-100 dark:border-slate-700 relative">
          {doc.thumbnail?.url ? (
            <Image
              src={doc.thumbnail.url}
              alt={title}
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : (
             <FileText className="text-gray-400" size={28} />
          )}
        </div>
        
        <div className="flex-1">
          {category && (
            <span className="inline-block px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-primary-blue text-xs font-semibold rounded mb-2">
              {category}
            </span>
          )}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug">
            {title}
          </h3>
        </div>
      </div>

      {description && (
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-2 flex-grow">
          {description}
        </p>
      )}

      {/* Metadata */}
      <div className="flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400 mb-6">
        {publishedDate && (
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{publishedDate}</span>
          </div>
        )}
        {fileSizeStr && (
          <div className="flex items-center gap-1">
            <HardDrive size={14} />
            <span>{fileSizeStr}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-slate-800">
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 text-sm font-bold rounded-lg transition-colors"
        >
          <ExternalLink size={16} />
          <span>{isNp ? 'à¤¹à¥‡à¤°à¥à¤¨à¥à¤¹à¥‹à¤¸à¥' : 'View'}</span>
        </a>
        <a
          href={fileUrl}
          download
          className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary-blue hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors"
        >
          <Download size={16} />
          <span>{isNp ? 'à¤¡à¤¾à¤‰à¤¨à¤²à¥‹à¤¡' : 'Download'}</span>
        </a>
      </div>
    </motion.div>
  );
}
