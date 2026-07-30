import React, { Suspense } from 'react';
import StrategyClient from './StrategyClient';
import StrategySkeleton from './Skeletons/StrategySkeleton';
import StrategyError from './States/StrategyError';
import StrategyEmpty from './States/StrategyEmpty';

async function fetchStrategyData(provinceId) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/public/about?provinceId=${provinceId}`, { 
      next: { tags: ['about-page'] } 
    });
    
    if (!response.ok) throw new Error('Failed to fetch data');
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching Strategy Data:', error);
    return null;
  }
}

export default async function AboutStrategy({ provinceId, locale = 'en' }) {
  const data = await fetchStrategyData(provinceId);

  if (!data) {
    return <StrategyError locale={locale} />;
  }

  // Graceful empty state
  if (!data.organization && (!data.objectives || data.objectives.length === 0) && (!data.coreValues || data.coreValues.length === 0)) {
    return <StrategyEmpty locale={locale} />;
  }

  return (
    <section className="w-full relative bg-white dark:bg-slate-950 py-10">
      <Suspense fallback={<StrategySkeleton />}>
        <StrategyClient data={data} locale={locale} />
      </Suspense>
    </section>
  );
}
