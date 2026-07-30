'use client';

import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ searchQuery, setSearchQuery, locale = 'en' }) {
  const isNp = locale === 'np';
  const placeholder = isNp ? 'à¤•à¤¾à¤—à¤œà¤¾à¤¤ à¤–à¥‹à¤œà¥à¤¨à¥à¤¹à¥‹à¤¸à¥...' : 'Search documents...';

  return (
    <div className="relative w-full md:w-96">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all shadow-sm"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label={placeholder}
      />
    </div>
  );
}
