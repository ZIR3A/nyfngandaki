import React, { Suspense } from 'react';
import TimelineClient from './TimelineClient';
import TimelineSkeleton from './Skeletons/TimelineSkeleton';
import TimelineError from './States/TimelineError';
import TimelineEmpty from './States/TimelineEmpty';

async function fetchTimelineData(provinceId) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/public/about?provinceId=${provinceId}`, { 
      next: { tags: ['about-page'] } 
    });
    
    if (!response.ok) throw new Error('Failed to fetch data');
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching Timeline Data:', error);
    return null;
  }
}

export default async function AboutTimeline({ provinceId, locale = 'en' }) {
  const data = await fetchTimelineData(provinceId);

  if (!data) {
    return <TimelineError locale={locale} />;
  }

  // Graceful empty state
  if (!data.timeline || data.timeline.length === 0) {
    return <TimelineEmpty locale={locale} />;
  }

  return (
    <section className="relative w-full bg-gray-50 dark:bg-slate-950 py-16 lg:py-16 lg:py-24 overflow-hidden z-10">
      
      {/* Decorative gradient blur in background */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-primary-red/5 rounded-full blur-[100px] pointer-events-none" />

      <Suspense fallback={<TimelineSkeleton />}>
        <TimelineClient data={data} locale={locale} />
      </Suspense>
    </section>
  );
}
