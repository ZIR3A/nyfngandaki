import React, { Suspense } from 'react';
import WhatWeDoClient from './WhatWeDoClient';
import WhatWeDoSkeleton from './Skeletons/WhatWeDoSkeleton';
import WhatWeDoError from './States/WhatWeDoError';
import WhatWeDoEmpty from './States/WhatWeDoEmpty';

import connectToDatabase from '@/lib/mongodb';
import { aboutService } from '@/features/about/services/aboutService';

async function fetchWhatWeDoData(provinceId) {
  try {
    await connectToDatabase();
    const data = await aboutService.getPublicAboutPage(provinceId);
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error('Error fetching What We Do Data:', error);
    return null;
  }
}

export default async function AboutWhatWeDo({ provinceId, locale = 'en', data }) {
  const finalData = data || await fetchWhatWeDoData(provinceId);

  if (!finalData) {
    return <WhatWeDoError locale={locale} />;
  }

  // Show empty state only if activities array is empty
  if (!finalData.activities || finalData.activities.length === 0) {
    return <WhatWeDoEmpty locale={locale} />;
  }

  return (
    <section className="w-full bg-white dark:bg-slate-950 py-16 lg:py-16 lg:py-24 overflow-hidden relative">
      <Suspense fallback={<WhatWeDoSkeleton />}>
        <WhatWeDoClient data={finalData} locale={locale} />
      </Suspense>
    </section>
  );
}
