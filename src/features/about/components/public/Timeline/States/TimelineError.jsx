import React from 'react';

export default function TimelineError({ locale = 'en', onRetry }) {
  const isNp = locale === 'np';
  const message = isNp ? 'माफ गर्नुहोला, टाइमलाइन लोड गर्न सकिएन ।' : 'Sorry, the timeline could not be loaded.';
  const retryText = isNp ? 'पुनः प्रयास गर्नुहोस्' : 'Try Again';

  return (
    <div className="w-full max-w-[1200px] mx-auto py-16 lg:py-24 px-6 text-center">
      <div className="inline-block bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
        <p className="text-gray-700 dark:text-gray-300 font-medium mb-6 text-lg">{message}</p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="px-6 py-2.5 bg-primary-blue hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            {retryText}
          </button>
        )}
      </div>
    </div>
  );
}
