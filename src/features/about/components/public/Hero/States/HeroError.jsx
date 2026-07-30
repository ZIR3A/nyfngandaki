import React from 'react';

export default function HeroError({ locale = 'en', onRetry }) {
  const isNp = locale === 'np';
  const message = isNp ? 'à¤®à¤¾à¤« à¤—à¤°à¥à¤¨à¥à¤¹à¥‹à¤²à¤¾, à¤µà¤¿à¤µà¤°à¤£ à¤²à¥‹à¤¡ à¤—à¤°à¥à¤¨ à¤¸à¤•à¤¿à¤à¤¨ à¥¤' : 'Sorry, the hero content could not be loaded.';
  const retryText = isNp ? 'à¤ªà¥à¤¨à¤ƒ à¤ªà¥à¤°à¤¯à¤¾à¤¸ à¤—à¤°à¥à¤¨à¥à¤¹à¥‹à¤¸à¥' : 'Try Again';

  return (
    <div className="w-full min-h-[50vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6 text-center shadow-sm">
      <div className="text-red-500 mb-4">
        {/* Simple error icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p className="text-gray-700 dark:text-gray-300 font-medium mb-6 text-lg">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        >
          {retryText}
        </button>
      )}
    </div>
  );
}
