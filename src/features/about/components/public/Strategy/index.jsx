import React, { Suspense } from 'react';
import StrategyClient from './StrategyClient';
import StrategySkeleton from './Skeletons/StrategySkeleton';
import StrategyError from './States/StrategyError';
import StrategyEmpty from './States/StrategyEmpty';

import connectToDatabase from '@/lib/mongodb';
import { aboutService } from '@/features/about/services/aboutService';

async function fetchStrategyData(provinceId) {
  try {
    await connectToDatabase();
    const data = await aboutService.getPublicAboutPage(provinceId);
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error('Error fetching Strategy Data:', error);
    return null;
  }
}

export default async function AboutStrategy({ provinceId, locale = 'en', data }) {
  const finalData = data || await fetchStrategyData(provinceId);

  if (!finalData) {
    return <StrategyError locale={locale} />;
  }

  // Graceful empty state
  if (!finalData.organization && (!finalData.objectives || finalData.objectives.length === 0) && (!finalData.coreValues || finalData.coreValues.length === 0)) {
    return <StrategyEmpty locale={locale} />;
  }

  return (
    <section className="w-full relative bg-white dark:bg-slate-950 py-10">
      <Suspense fallback={<StrategySkeleton />}>
        <StrategyClient data={finalData} locale={locale} />
      </Suspense>
    </section>
  );
}
