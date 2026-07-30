import React, { Suspense } from 'react';
import ConnectClient from './ConnectClient';
import ConnectSkeleton from './Skeletons/ConnectSkeleton';
import ConnectError from './States/ConnectError';
import ConnectEmpty from './States/ConnectEmpty';

async function fetchConnectData(provinceId) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/public/about?provinceId=${provinceId}`, { 
      next: { tags: ['about-page'] } 
    });
    
    if (!response.ok) throw new Error('Failed to fetch data');
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching Connect Data:', error);
    return null;
  }
}

export default async function AboutConnect({ provinceId, locale = 'en' }) {
  const data = await fetchConnectData(provinceId);

  if (!data) {
    return <ConnectError locale={locale} />;
  }

  // Show empty state if there is no leadership message and no CTA
  const hasLeadership = !!(data.leadership?.message || data.leadership?.photo);
  const hasCTA = !!data.cta?.heading?.[locale];

  if (!hasLeadership && !hasCTA) {
    return <ConnectEmpty locale={locale} />;
  }

  return (
    <section className="w-full bg-white dark:bg-slate-950 py-16 lg:py-24 overflow-hidden relative border-t border-gray-100 dark:border-slate-900">
      <Suspense fallback={<ConnectSkeleton />}>
        <ConnectClient data={data} locale={locale} />
      </Suspense>
    </section>
  );
}
