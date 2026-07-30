'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Download, ExternalLink, FileText } from 'lucide-react';

export default function FeaturedConstitution({ constitution, locale = 'en' }) {
  if (!constitution || !constitution.title) return null;

  const isNp = locale === 'np';
  const title = constitution.title; // Assumed string based on simplified schema or object
  const description = constitution.description;
  const version = constitution.version || '1.0';
  const publishedDate = constitution.publishedDate ? new Date(constitution.publishedDate).toLocaleDateString(isNp ? 'ne-NP' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-[1440px] mx-auto px-6 md:px-12 mb-24"
    >
      <div className="flex flex-col lg:flex-row bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-xl shadow-primary-blue/5">
        
        {/* Left: Premium Cover Image */}
        <div className="w-full lg:w-5/12 bg-gray-50 dark:bg-slate-950 relative min-h-[300px] lg:min-h-[400px] flex items-center justify-center p-8 border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-slate-800">
          <div className="relative w-full max-w-[280px] aspect-[1/1.4] shadow-2xl rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 transform hover:scale-105 transition-transform duration-500">
            {constitution.coverImage?.url ? (
              <Image
                src={constitution.coverImage.url}
                alt={constitution.coverImage.alt || 'Constitution Cover'}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary-blue to-blue-800 flex flex-col items-center justify-center text-white p-6 text-center">
                <FileText size={48} className="mb-4 opacity-50" />
                <h3 className="font-serif font-bold text-xl">{title}</h3>
              </div>
            )}
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Right: Metadata & Actions */}
        <div className="w-full lg:w-7/12 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-primary-red/10 text-primary-red text-xs font-bold rounded-full uppercase tracking-wider">
              {isNp ? 'à¤†à¤§à¤¿à¤•à¤¾à¤°à¤¿à¤• à¤¦à¤¸à¥à¤¤à¤¾à¤µà¥‡à¤œ' : 'Official Document'}
            </span>
            {version && (
              <span className="px-3 py-1 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-full">
                v{version}
              </span>
            )}
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight font-serif">
            {title}
          </h2>

          {description && (
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl">
              {description}
            </p>
          )}

          {publishedDate && (
            <div className="mb-10 text-sm font-medium text-gray-500 dark:text-gray-500">
              {isNp ? 'à¤ªà¥à¤°à¤•à¤¾à¤¶à¤¿à¤¤ à¤®à¤¿à¤¤à¤¿:' : 'Published:'} <span className="text-gray-900 dark:text-gray-300">{publishedDate}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            {constitution.pdfFile?.url && (
              <>
                <a
                  href={constitution.pdfFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-primary-blue/30 hover:-translate-y-1"
                >
                  <ExternalLink size={20} />
                  <span>{isNp ? 'à¤…à¤¨à¤²à¤¾à¤‡à¤¨ à¤ªà¤¢à¥à¤¨à¥à¤¹à¥‹à¤¸à¥' : 'View Online'}</span>
                </a>
                
                <a
                  href={constitution.pdfFile.url}
                  download
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-900 dark:text-white font-bold rounded-xl transition-all hover:-translate-y-1"
                >
                  <Download size={20} />
                  <span>{isNp ? 'à¤¡à¤¾à¤‰à¤¨à¤²à¥‹à¤¡ à¤—à¤°à¥à¤¨à¥à¤¹à¥‹à¤¸à¥ (PDF)' : 'Download PDF'}</span>
                </a>
              </>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
