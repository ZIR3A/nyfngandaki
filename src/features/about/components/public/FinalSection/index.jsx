import React, { Suspense } from 'react';
import FinalClient from './FinalClient';
import FinalSkeleton from './Skeletons/FinalSkeleton';
import FinalError from './States/FinalError';
import FinalEmpty from './States/FinalEmpty';

async function fetchFinalData(provinceId) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/public/about?provinceId=${provinceId}`, { 
      next: { tags: ['about-page'] } 
    });
    
    if (!response.ok) throw new Error('Failed to fetch data');
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching Final Data:', error);
    return null;
  }
}

export default async function AboutFinalSection({ provinceId, locale = 'en' }) {
  const data = await fetchFinalData(provinceId);

  if (!data) {
    return <FinalError locale={locale} />;
  }

  const hasCta = !!data.cta?.heading;

  if (!hasCta) {
    return null;
  }

  return (
    <Suspense fallback={<FinalSkeleton />}>
      <FinalClient data={data} locale={locale} />
    </Suspense>
  );
}
