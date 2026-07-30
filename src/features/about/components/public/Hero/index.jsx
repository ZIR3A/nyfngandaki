import React, { Suspense } from 'react';
import axios from 'axios';
import HeroError from './States/HeroError';
import HeroEmpty from './States/HeroEmpty';
import { PageHeader } from '@/components/shared/PageHeader';

// Note: In Next.js App Router, this Server Component can fetch data directly
async function fetchAboutData(provinceId) {
  try {
    // In production, adjust the baseURL or use absolute URL
    // We assume the API returns { success: true, data: { ... } }
    // Using dummy URL for now. It should point to the Next.js API route or direct service call.
    // E.g., const res = await aboutService.getPublicAboutPage(provinceId);
    
    // Simulating the API response for the architecture implementation:
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/public/about?provinceId=${provinceId}`, { 
      next: { tags: ['about-page'] } 
    });
    
    if (!response.ok) throw new Error('Failed to fetch data');
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching About Hero Data:', error);
    return null;
  }
}

export default async function AboutHero({ provinceId, locale = 'en' }) {
  const data = await fetchAboutData(provinceId);

  if (!data) {
    return <HeroError locale={locale} />;
  }

  // If hero is explicitly disabled (hypothetical CMS flag) or data is completely empty
  if (data.hero && data.hero.enableHero === false) {
    return <HeroEmpty locale={locale} />;
  }

  const title = data.hero?.title?.[locale];
  const subtitle = data.hero?.subtitle?.[locale];
  const imageSrc = data.hero?.imageId?.publicUrl || data.hero?.media?.[0]?.url || null;
  const overlayOpacity = data.hero?.overlayOpacity;
  const overlayColor = data.hero?.overlayColor;

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
