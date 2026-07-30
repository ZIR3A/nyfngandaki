import React, { Suspense } from 'react';
import DocumentsClient from './DocumentsClient';
import DocumentsSkeleton from './Skeletons/DocumentsSkeleton';
import DocumentsError from './States/DocumentsError';
import DocumentsEmpty from './States/DocumentsEmpty';

async function fetchDocumentsData(provinceId) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/public/about?provinceId=${provinceId}`, { 
      next: { tags: ['about-page'] } 
    });
    
    if (!response.ok) throw new Error('Failed to fetch data');
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching Documents Data:', error);
    return null;
  }
}

export default async function AboutDocuments({ provinceId, locale = 'en' }) {
  const data = await fetchDocumentsData(provinceId);

  if (!data) {
    return <DocumentsError locale={locale} />;
  }

  // Graceful empty state - Check if both major data sources are missing
  const hasConstitution = !!data.featuredConstitution?.title;
  const hasDocuments = data.documents?.length > 0;

  if (!hasConstitution && !hasDocuments) {
    return <DocumentsEmpty locale={locale} />;
  }

  return (
    <section className="w-full bg-white dark:bg-slate-950 py-16 lg:py-16 lg:py-24 overflow-hidden relative">
      <Suspense fallback={<DocumentsSkeleton />}>
        <DocumentsClient data={data} locale={locale} />
      </Suspense>
    </section>
  );
}
