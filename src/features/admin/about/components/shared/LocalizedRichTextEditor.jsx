"use client";

import React, { useState } from 'react';
import RichTextEditor from '@/features/bidhan/components/admin/RichTextEditor';

export function LocalizedRichTextEditor({ 
  value = { en: '', np: '' }, 
  onChange, 
  label, 
  description,
  placeholder = { en: '', np: '' },
  required = false,
}) {
  const [activeLang, setActiveLang] = useState('en');

  const handleChange = (content) => {
    onChange({
      ...value,
      [activeLang]: content
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5">
            <button
              type="button"
              onClick={() => setActiveLang('en')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                activeLang === 'en' 
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setActiveLang('np')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                activeLang === 'np' 
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              NP
            </button>
          </div>
        </div>
      )}
      
      {description && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}

      <div className="relative">
        <RichTextEditor
          value={value[activeLang]}
          onChange={handleChange}
          placeholder={placeholder[activeLang] || placeholder.en}
        />
        
        {/* Language indicator overlay to ensure user knows which language they are editing */}
        <div className="absolute top-2 right-2 flex items-center">
          <span className="text-[10px] font-bold tracking-wider uppercase text-gray-400 bg-gray-50/80 dark:bg-gray-900/80 px-2 py-1 rounded backdrop-blur-sm pointer-events-none">
            Editing in {activeLang === 'en' ? 'English' : 'Nepali'}
          </span>
        </div>
      </div>
    </div>
  );
}
