import { MembersDirectoryLayout } from "@/features/members/components/MembersDirectoryLayout";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: locale === "np" ? "सदस्य निर्देशिका | NYFN Gandaki" : "Members Directory | NYFN Gandaki",
    description: locale === "np" ? "राष्ट्रिय युवा संघ नेपाल गण्डकी प्रदेशका सदस्यहरूको विवरण" : "Directory of NYFN Gandaki Province Members",
    alternates: {
      canonical: `https://nyfngandaki.org/${locale}/members`,
      languages: {
        en: `https://nyfngandaki.org/en/members`,
        ne: `https://nyfngandaki.org/np/members`,
        "x-default": `https://nyfngandaki.org/en/members`,
      },
    },
  };
}

import { Suspense } from "react";

export default async function MembersDirectoryPage({ params }) {
  const { locale } = await params;
  const isNepali = locale === "np";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": isNepali ? "गृहपृष्ठ" : "Home",
        "item": `https://nyfngandaki.org/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": isNepali ? "सदस्य निर्देशिका" : "Members Directory",
        "item": `https://nyfngandaki.org/${locale}/members`
      }
    ]
  };

  return (
    <main className="min-h-screen bg-background selection:bg-primary/10 selection:text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <MembersDirectoryLayout isNepali={isNepali} />
      </Suspense>
    </main>
  );
}
