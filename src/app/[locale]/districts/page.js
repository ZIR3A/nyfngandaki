import { PageHeader } from "@/components/shared/PageHeader";
import { DistrictCard } from "@/components/shared/DistrictCard";
import connectToDatabase from "@/lib/mongodb";
import District from "@/models/District";
import Member from "@/models/Member";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: locale === "np" ? "जिल्ला कमिटीहरू | NYFN Gandaki" : "District Committees | NYFN Gandaki",
    description: locale === "np" ? "गण्डकी प्रदेशका ११ वटै जिल्लाहरूमा हाम्रो बलियो उपस्थिति।" : "Our strong grassroots presence across all 11 districts of Gandaki Province.",
    alternates: {
      canonical: `https://nyfngandaki.org/${locale}/districts`,
      languages: {
        en: `https://nyfngandaki.org/en/districts`,
        np: `https://nyfngandaki.org/np/districts`,
      },
    },
  };
}

export default async function DistrictCommitteesPage({ params }) {
  const { locale } = await params;
  const isNepali = locale === "np";
  
  await connectToDatabase();
  
  // Fetch active districts
  const districtsData = await District.find({ status: "Active" })
    .sort({ displayOrder: 1, name: 1 })
    .lean();

  // Optionally fetch member counts per district if we want accurate stats
  const memberCounts = await Member.aggregate([
    { $match: { status: "Active" } },
    { $group: { _id: "$district", count: { $sum: 1 } } }
  ]);

  const mappedDistricts = districtsData.map(district => {
    const stat = memberCounts.find(m => m._id?.toString() === district._id.toString());
    
    return {
      id: district._id.toString(),
      slug: district.slug,
      name: isNepali && district.name.np ? district.name.np : district.name.en,
      imageUrl: district.coverImage,
      memberCount: stat ? stat.count : 0,
      committeeCount: 12 // Hardcoded for now as in old code, could be dynamic later
    };
  });

  return (
    <main className="min-h-screen bg-background">
      <PageHeader 
        title={isNepali ? "जिल्ला कमिटीहरू" : "District Committees"}
        subtitle={isNepali ? "गण्डकी प्रदेशका ११ वटै जिल्लाहरूमा हाम्रो बलियो उपस्थिति।" : "Our strong grassroots presence across all 11 districts of Gandaki Province."}
        breadcrumbItems={[
          { label: isNepali ? "गृहपृष्ठ" : "Home", href: `/${locale}` },
          { label: isNepali ? "जिल्ला कमिटीहरू" : "Districts", href: `/${locale}/districts`, active: true }
        ]}
      />

      <section className="py-24 bg-[#F8FAFC] dark:bg-gray-900 transition-colors">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {mappedDistricts.length === 0 ? (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-[20px] bg-white dark:bg-gray-800">
              {isNepali ? "कुनै जिल्ला कमिटीहरू फेला परेनन्।" : "No district committees found."}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {mappedDistricts.map(district => (
                <DistrictCard key={district.id} district={district} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
