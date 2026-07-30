import React from 'react';
import AboutSettingsClient from '@/features/admin/about/components/AboutSettingsClient';

export const metadata = {
  title: 'About Page Settings | NYFN Gandaki Admin',
};

export default function AboutSettingsPage() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">About Page Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage every section displayed on the public About page.
        </p>
      </div>
      
      {/* We pass control to the client orchestrator for the vertical tabs */}
      <AboutSettingsClient />
    </div>
  );
}
