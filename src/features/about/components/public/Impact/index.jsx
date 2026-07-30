import React, { Suspense } from 'react';
import ImpactClient from './ImpactClient';
import ImpactSkeleton from './Skeletons/ImpactSkeleton';
import ImpactError from './States/ImpactError';
import ImpactEmpty from './States/ImpactEmpty';

async function fetchImpactData(provinceId) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/public/about?provinceId=${provinceId}`, { 
      next: { tags: ['about-page'] } 
    });
    
    if (!response.ok) throw new Error('Failed to fetch data');
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching Impact Data:', error);
    return null;
  }
}

export default async function AboutImpact({ provinceId, locale = 'en' }) {
  const data = await fetchImpactData(provinceId);

  if (!data) {
    return <ImpactError locale={locale} />;
  }

  // Graceful empty state - Check if all 4 arrays are missing/empty
  const hasStats = data.statistics?.length > 0;
  const hasHighlights = data.impactHighlights?.length > 0;
  const hasAchievements = data.achievements?.length > 0;
  const hasRecognitions = data.recognitions?.length > 0;

  if (!hasStats && !hasHighlights && !hasAchievements && !hasRecognitions) {
    return <ImpactEmpty locale={locale} />;
  }

  return (
    <section className="w-full bg-gray-50 dark:bg-slate-950 py-16 lg:py-16 lg:py-24 overflow-hidden relative">
      <Suspense fallback={<ImpactSkeleton />}>
        <ImpactClient data={data} locale={locale} />
      </Suspense>
    </section>
  );
}
