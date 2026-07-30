import React, { Suspense } from 'react';
import WhoWeAreClient from './WhoWeAreClient';
import WhoWeAreSkeleton from './Skeletons/WhoWeAreSkeleton';
import WhoWeAreError from './States/WhoWeAreError';
import WhoWeAreEmpty from './States/WhoWeAreEmpty';

import connectToDatabase from '@/lib/mongodb';
import { aboutService } from '@/features/about/services/aboutService';

// Note: Using a direct DB call or a fetch to the API route
async function fetchWhoWeAreData(provinceId) {
  try {
    await connectToDatabase();
    const data = await aboutService.getPublicAboutPage(provinceId);
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error('Error fetching Who We Are Data:', error);
    return null;
  }
}

export default async function AboutWhoWeAre({ provinceId, locale = 'en', data }) {
  const finalData = data || await fetchWhoWeAreData(provinceId);

  if (!finalData) {
    return <WhoWeAreError locale={locale} />;
  }

  // Graceful empty state if content doesn't exist
  if (!finalData.organization || Object.keys(finalData.organization).length === 0) {
    return <WhoWeAreEmpty locale={locale} />;
  }

  return (
    <section className="w-full py-16 lg:py-16 lg:py-24 bg-white dark:bg-slate-950 overflow-hidden relative">
      {/* Optional decorative background elements can be placed here */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-primary-red/5 rounded-full blur-3xl pointer-events-none" />

      <Suspense fallback={<WhoWeAreSkeleton />}>
        <WhoWeAreClient data={finalData} locale={locale} />
      </Suspense>
    </section>
  );
}
