import React, { Suspense } from 'react';
import WhatWeDoClient from './WhatWeDoClient';
import WhatWeDoSkeleton from './Skeletons/WhatWeDoSkeleton';
import WhatWeDoError from './States/WhatWeDoError';
import WhatWeDoEmpty from './States/WhatWeDoEmpty';

async function fetchWhatWeDoData(provinceId) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/public/about?provinceId=${provinceId}`, { 
      next: { tags: ['about-page'] } 
    });
    
    if (!response.ok) throw new Error('Failed to fetch data');
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching What We Do Data:', error);
    return null;
  }
}

export default async function AboutWhatWeDo({ provinceId, locale = 'en' }) {
  const data = await fetchWhatWeDoData(provinceId);

  if (!data) {
    return <WhatWeDoError locale={locale} />;
  }

  // Show empty state only if activities array is empty
  if (!data.activities || data.activities.length === 0) {
    return <WhatWeDoEmpty locale={locale} />;
  }

  return (
    <section className="w-full bg-white dark:bg-slate-950 py-16 lg:py-16 lg:py-24 overflow-hidden relative">
      <Suspense fallback={<WhatWeDoSkeleton />}>
        <WhatWeDoClient data={data} locale={locale} />
      </Suspense>
    </section>
  );
}
