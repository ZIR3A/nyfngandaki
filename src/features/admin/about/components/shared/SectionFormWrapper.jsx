'use client';

import React from 'react';
import { Save, Loader2, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export function SectionFormWrapper({
  title,
  description,
  children,
  onSave,
  isLoading = false,
  isDirty = false,
  lastSaved = null
}) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {lastSaved && !isDirty && (
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5 hidden sm:flex">
              <RefreshCw className="w-3 h-3" />
              Saved {lastSaved}
            </span>
          )}
          
          <button
            onClick={onSave}
            disabled={isLoading || !isDirty}
            className={`
              flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm
              ${isDirty && !isLoading
                ? 'bg-primary-blue hover:bg-blue-700 text-white hover:shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Form Content Area */}
      <div className="p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
