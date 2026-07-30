import React, { Suspense } from 'react';
import ConnectClient from './ConnectClient';
import ConnectSkeleton from './Skeletons/ConnectSkeleton';
import ConnectError from './States/ConnectError';
import ConnectEmpty from './States/ConnectEmpty';

import connectToDatabase from '@/lib/mongodb';
import { aboutService } from '@/features/about/services/aboutService';

async function fetchConnectData(provinceId) {
  try {
    await connectToDatabase();
    const data = await aboutService.getPublicAboutPage(provinceId);
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error('Error fetching Connect Data:', error);
    return null;
  }
}

export default async function AboutConnect({ provinceId, locale = 'en', data }) {
  const finalData = data || await fetchConnectData(provinceId);

  if (!finalData) {
    return <ConnectError locale={locale} />;
  }

  // Show empty state if there is no leadership message and no CTA
  const hasLeadership = !!(finalData.leadership?.message || finalData.leadership?.photo);
  const hasCTA = !!finalData.cta?.heading?.[locale];

  if (!hasLeadership && !hasCTA) {
    return <ConnectEmpty locale={locale} />;
  }

  return (
    <section className="w-full bg-white dark:bg-slate-950 py-16 lg:py-24 overflow-hidden relative border-t border-gray-100 dark:border-slate-900">
      <Suspense fallback={<ConnectSkeleton />}>
        <ConnectClient data={finalData} locale={locale} />
      </Suspense>
    </section>
  );
}
