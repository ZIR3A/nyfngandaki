import React, { Suspense } from 'react';
import FinalClient from './FinalClient';
import FinalSkeleton from './Skeletons/FinalSkeleton';
import FinalError from './States/FinalError';
import FinalEmpty from './States/FinalEmpty';

import connectToDatabase from '@/lib/mongodb';
import { aboutService } from '@/features/about/services/aboutService';

async function fetchFinalData(provinceId) {
  try {
    await connectToDatabase();
    const data = await aboutService.getPublicAboutPage(provinceId);
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error('Error fetching Final Data:', error);
    return null;
  }
}

export default async function AboutFinalSection({ provinceId, locale = 'en', data }) {
  const finalData = data || await fetchFinalData(provinceId);

  if (!finalData) {
    return <FinalError locale={locale} />;
  }

  const hasCta = !!finalData.cta?.heading;

  if (!hasCta) {
    return null;
  }

  return (
    <Suspense fallback={<FinalSkeleton />}>
      <FinalClient data={finalData} locale={locale} />
    </Suspense>
  );
}
