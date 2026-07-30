import React, { Suspense } from 'react';
import axios from 'axios';
import HeroError from './States/HeroError';
import HeroEmpty from './States/HeroEmpty';
import { PageHeader } from '@/components/shared/PageHeader';

import connectToDatabase from '@/lib/mongodb';
import { aboutService } from '@/features/about/services/aboutService';

// Note: In Next.js App Router, this Server Component can fetch data directly
async function fetchAboutData(provinceId) {
  try {
    await connectToDatabase();
    const data = await aboutService.getPublicAboutPage(provinceId);
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error('Error fetching About Hero Data:', error);
    return null;
  }
}

export default async function AboutHero({ provinceId, locale = 'en', data }) {
  const finalData = data || await fetchAboutData(provinceId);

  if (!finalData) {
    return <HeroError locale={locale} />;
  }

  // If hero is explicitly disabled (hypothetical CMS flag) or data is completely empty
  if (finalData.hero && finalData.hero.enableHero === false) {
    return <HeroEmpty locale={locale} />;
  }

  const title = finalData.hero?.title?.[locale];
  const subtitle = finalData.hero?.subtitle?.[locale];
  const imageSrc = finalData.hero?.imageId?.publicUrl || finalData.hero?.media?.[0]?.url || null;
  const overlayOpacity = finalData.hero?.overlayOpacity;
  const overlayColor = finalData.hero?.overlayColor;

  const breadcrumbItems = [
    { label: locale === 'np' ? 'गृहपृष्ठ' : 'Home', href: `/${locale}` },
    { label: locale === 'np' ? 'हाम्रो बारेमा' : 'About Us', href: `/${locale}/about` },
  ];

  return (
    <PageHeader 
      title={title} 
      subtitle={subtitle} 
      imageSrc={imageSrc} 
      breadcrumbItems={breadcrumbItems}
      overlayOpacity={overlayOpacity}
      overlayColor={overlayColor}
    />
  );
}
