import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';

export const dynamic = "force-dynamic";
import AboutHero from '@/features/about/components/public/Hero';
import AboutWhoWeAre from '@/features/about/components/public/WhoWeAre';
import AboutStrategy from '@/features/about/components/public/Strategy';
import AboutConnect from '@/features/about/components/public/Connect';
import AboutDocuments from '@/features/about/components/public/Documents';
import AboutFinalSection from '@/features/about/components/public/FinalSection';

import connectToDatabase from '@/lib/mongodb';
import { aboutService } from '@/features/about/services/aboutService';

async function fetchSeoData(provinceId) {
  try {
    await connectToDatabase();
    const data = await aboutService.getPublicAboutPage(provinceId);
    return data?.seo || null;
  } catch (error) {
    console.error('Error fetching SEO Data:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const provinceId = process.env.NEXT_PUBLIC_PROVINCE_ID || '64f0b2f6e4b0a1b2c3d4e5f6';
  const seo = await fetchSeoData(provinceId);

  if (!seo) {
    return {
      title: locale === 'np' ? 'हाम्रो बारेमा | NYFN गण्डकी' : 'About Us | NYFN Gandaki',
      description: locale === 'np' ? 'राष्ट्रिय युवा संघ नेपाल, गण्डकी प्रदेशको आधिकारिक वेबसाइट' : 'Official website of National Youth Federation Nepal, Gandaki Province',
    };
  }

  return {
    title: seo.title?.[locale] || (locale === 'np' ? 'हाम्रो बारेमा' : 'About Us'),
    description: seo.description?.[locale] || '',
    keywords: seo.keywords?.[locale] || '',
    alternates: {
      canonical: seo.canonicalUrl || `https://gandaki.nyfn.org.np/${locale}/about`,
    },
    openGraph: {
      title: seo.ogTitle?.[locale] || seo.title?.[locale],
      description: seo.ogDescription?.[locale] || seo.description?.[locale],
      images: seo.ogImage?.url ? [{ url: seo.ogImage.url }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.ogTitle?.[locale],
      description: seo.ogDescription?.[locale],
      images: seo.ogImage?.url ? [seo.ogImage.url] : [],
    }
  };
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const provinceId = process.env.NEXT_PUBLIC_PROVINCE_ID || '64f0b2f6e4b0a1b2c3d4e5f6';

  // Verify supported locales
  if (locale !== 'en' && locale !== 'np') {
    notFound();
  }

  // Pre-fetch SEO data to inject JSON-LD
  const seoData = await fetchSeoData(provinceId);

  // Fetch full page data directly from DB to pass to modules, avoiding HTTP fetch loop
  await connectToDatabase();
  const rawAboutData = await aboutService.getPublicAboutPage(provinceId);
  const aboutData = JSON.parse(JSON.stringify(rawAboutData));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": seoData?.title?.[locale] || "About NYFN Gandaki",
    "description": seoData?.description?.[locale] || "",
    "publisher": {
      "@type": "Organization",
      "name": "National Youth Federation Nepal (NYFN) Gandaki",
      "logo": "https://gandaki.nyfn.org.np/logo.png"
    }
  };

  return (
    <main className="w-full flex flex-col min-h-screen bg-white dark:bg-slate-950">
      
      {/* JSON-LD Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Module */}
      <AboutHero provinceId={provinceId} locale={locale} data={aboutData} />
      
      {/* Who We Are (Storytelling) */}
      <AboutWhoWeAre provinceId={provinceId} locale={locale} data={aboutData} />
      
      {/* Strategy (Vision/Mission/Values) */}
      <AboutStrategy provinceId={provinceId} locale={locale} data={aboutData} />

      {/* Connect (Leadership & Excellence) */}
      <AboutConnect provinceId={provinceId} locale={locale} data={aboutData} />

      {/* Documents (Transparency Center) */}
      <AboutDocuments provinceId={provinceId} locale={locale} data={aboutData} />

      {/* Final Section (Partners, FAQ, CTA) */}
      <AboutFinalSection provinceId={provinceId} locale={locale} data={aboutData} />

    </main>
  );
}
