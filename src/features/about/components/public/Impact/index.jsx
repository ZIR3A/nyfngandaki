import React, { Suspense } from 'react';
import ImpactClient from './ImpactClient';
import ImpactSkeleton from './Skeletons/ImpactSkeleton';
import ImpactError from './States/ImpactError';
import ImpactEmpty from './States/ImpactEmpty';

import connectToDatabase from '@/lib/mongodb';
import { aboutService } from '@/features/about/services/aboutService';

async function fetchImpactData(provinceId) {
  try {
    await connectToDatabase();
    const data = await aboutService.getPublicAboutPage(provinceId);
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error('Error fetching Impact Data:', error);
    return null;
  }
}

export default async function AboutImpact({ provinceId, locale = 'en', data }) {
  const finalData = data || await fetchImpactData(provinceId);

  if (!finalData) {
    return <ImpactError locale={locale} />;
  }

  // Graceful empty state - Check if all 4 arrays are missing/empty
  const hasStats = finalData.statistics?.length > 0;
  const hasHighlights = finalData.impactHighlights?.length > 0;
  const hasAchievements = finalData.achievements?.length > 0;
  const hasRecognitions = finalData.recognitions?.length > 0;

  if (!hasStats && !hasHighlights && !hasAchievements && !hasRecognitions) {
    return <ImpactEmpty locale={locale} />;
  }

  return (
    <section className="w-full bg-gray-50 dark:bg-slate-950 py-16 lg:py-16 lg:py-24 overflow-hidden relative">
      <Suspense fallback={<ImpactSkeleton />}>
        <ImpactClient data={finalData} locale={locale} />
      </Suspense>
    </section>
  );
}
