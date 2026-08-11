import React from 'react';
import AboutSettingsClient from '@/features/admin/about/components/AboutSettingsClient';

export const metadata = {
  title: 'About Page Settings | NYFN Gandaki Admin',
};

export default function AboutSettingsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">About Page Settings</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage every section displayed on the public About page.
          </p>
        </div>
      </div>
      
      {/* We pass control to the client orchestrator for the vertical tabs */}
      <AboutSettingsClient />
    </div>
  );
}

