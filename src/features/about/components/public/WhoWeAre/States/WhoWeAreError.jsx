import React from 'react';

export default function WhoWeAreError({ locale = 'en', onRetry }) {
  const isNp = locale === 'np';
  const message = isNp ? 'माफ गर्नुहोला, संस्थाको जानकारी लोड गर्न सकिएन ।' : 'Sorry, the organization details could not be loaded.';
  const retryText = isNp ? 'पुनः प्रयास गर्नुहोस्' : 'Try Again';

  return (
    <div className="w-full max-w-7xl mx-auto py-16 lg:py-24 px-6">
      <div className="w-full min-h-[300px] flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-8 text-center shadow-sm">
        <div className="text-red-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-gray-700 dark:text-gray-300 font-medium mb-6 text-lg">{message}</p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="px-6 py-2.5 bg-primary-blue hover:bg-blue-700 text-white rounded-lg font-medium transition-colors focus:ring-4 focus:ring-blue-500/50 outline-none"
          >
            {retryText}
          </button>
        )}
      </div>
    </div>
  );
}
