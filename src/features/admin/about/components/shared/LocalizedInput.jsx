'use client';

import React, { useState } from 'react';

export function LocalizedInput({ 
  value = { en: '', np: '' }, 
  onChange, 
  label, 
  description,
  placeholder = { en: '', np: '' },
  required = false
}) {
  const [activeLang, setActiveLang] = useState('en');

  const handleChange = (e) => {
    onChange({
      ...value,
      [activeLang]: e.target.value
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
      
      <div className="relative group">
        <input
          type="text"
          value={value[activeLang] || ''}
          onChange={handleChange}
          placeholder={placeholder[activeLang] || ''}
          className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/20 transition-all font-medium text-gray-900 dark:text-white placeholder:text-gray-400"
          dir={activeLang === 'np' ? 'ltr' : 'ltr'}
        />
        {/* Optional flag indicator inside input */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 text-[10px] font-bold uppercase">
          {activeLang}
        </div>
      </div>
      
      {description && (
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      )}
    </div>
  );
}
