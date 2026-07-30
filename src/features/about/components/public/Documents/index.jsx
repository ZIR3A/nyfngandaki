import React, { Suspense } from 'react';
import DocumentsClient from './DocumentsClient';
import DocumentsSkeleton from './Skeletons/DocumentsSkeleton';
import DocumentsError from './States/DocumentsError';
import DocumentsEmpty from './States/DocumentsEmpty';

import connectToDatabase from '@/lib/mongodb';
import { aboutService } from '@/features/about/services/aboutService';

async function fetchDocumentsData(provinceId) {
  try {
    await connectToDatabase();
    const data = await aboutService.getPublicAboutPage(provinceId);
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error('Error fetching Documents Data:', error);
    return null;
  }
}

export default async function AboutDocuments({ provinceId, locale = 'en', data }) {
  const finalData = data || await fetchDocumentsData(provinceId);

  if (!finalData) {
    return <DocumentsError locale={locale} />;
  }

  // Graceful empty state - Check if both major data sources are missing
  const hasConstitution = !!finalData.featuredConstitution?.title;
  const hasDocuments = finalData.documents?.length > 0;

  if (!hasConstitution && !hasDocuments) {
    return <DocumentsEmpty locale={locale} />;
  }

  return (
    <section className="w-full bg-white dark:bg-slate-950 py-16 lg:py-16 lg:py-24 overflow-hidden relative">
      <Suspense fallback={<DocumentsSkeleton />}>
        <DocumentsClient data={finalData} locale={locale} />
      </Suspense>
    </section>
  );
}
