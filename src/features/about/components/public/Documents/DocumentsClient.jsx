'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../Strategy/Shared/SectionHeading';
import FeaturedConstitution from './FeaturedConstitution';
import SearchBar from './Controls/SearchBar';
import CategoryFilter from './Controls/CategoryFilter';
import DocumentGrid from './DocumentGrid';
import TransparencyNotice from './TransparencyNotice';

export default function DocumentsClient({ data, locale = 'en' }) {
  const { featuredConstitution, documents = [], categories = [], transparencyNotice } = data;

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const isNp = locale === 'np';
  const fallbackLabel = isNp ? 'पारदर्शिता केन्द्र' : 'Transparency Center';
  const fallbackHeading = isNp ? 'आधिकारिक कागजातहरू र डाउनलोडहरू' : 'Official Documents & Downloads';
  const fallbackDescription = isNp 
    ? 'संस्थाका नीति, निर्देशन र अन्य आधिकारिक दस्तावेजहरू सार्वजनिक पहुँचको लागि।' 
    : 'Access our official constitution, policies, guidelines, and organizational reports.';

  const heading = data.documentsConfig?.title?.[locale] || fallbackHeading;
  const description = data.documentsConfig?.description?.[locale] || fallbackDescription;
  const notice = data.documentsConfig?.transparencyNotice || transparencyNotice;

  // Client-side filtering logic
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      // 1. Filter by Search Query
      const searchLower = searchQuery.toLowerCase();
      const titleMatch = doc.title?.[locale]?.toLowerCase().includes(searchLower);
      const descMatch = doc.description?.[locale]?.toLowerCase().includes(searchLower);
      const matchesSearch = !searchQuery || titleMatch || descMatch;

      // 2. Filter by Category
      const docCategory = doc.category?.[locale];
      const matchesCategory = activeCategory === 'All' || docCategory === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [documents, searchQuery, activeCategory, locale]);

  return (
    <div className="w-full relative z-10">
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 px-6"
      >
        <SectionHeading label={fallbackLabel} heading={heading} centered={true} />
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-normal mt-[-1.5rem]">
          {description}
        </p>
      </motion.div>

      {/* 1. Highlighted Constitution */}
      <FeaturedConstitution constitution={featuredConstitution} locale={locale} />

      {/* 2. Controls (Search & Filters) */}
      {documents.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-[1440px] mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} locale={locale} />
          <CategoryFilter categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} locale={locale} />
        </motion.div>
      )}

      {/* 3. Document Grid */}
      <DocumentGrid documents={filteredDocuments} locale={locale} />

      {/* 4. Transparency Notice Footer */}
      <TransparencyNotice notice={transparencyNotice} locale={locale} />
      
    </div>
  );
}
