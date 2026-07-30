import React from 'react';

export default function TimelineError({ locale = 'en', onRetry }) {
  const isNp = locale === 'np';
  const message = isNp ? 'à¤®à¤¾à¤« à¤—à¤°à¥à¤¨à¥à¤¹à¥‹à¤²à¤¾, à¤Ÿà¤¾à¤‡à¤®à¤²à¤¾à¤‡à¤¨ à¤²à¥‹à¤¡ à¤—à¤°à¥à¤¨ à¤¸à¤•à¤¿à¤à¤¨ à¥¤' : 'Sorry, the timeline could not be loaded.';
  const retryText = isNp ? 'à¤ªà¥à¤¨à¤ƒ à¤ªà¥à¤°à¤¯à¤¾à¤¸ à¤—à¤°à¥à¤¨à¥à¤¹à¥‹à¤¸à¥' : 'Try Again';

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
