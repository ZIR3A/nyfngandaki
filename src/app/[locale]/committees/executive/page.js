import { PageHeader } from "@/components/shared/PageHeader";
import { MemberCard } from "@/components/shared/MemberCard";
import connectToDatabase from "@/lib/mongodb";
import Member from "@/models/Member";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: locale === "np" ? "कार्यकारी समिति | NYFN Gandaki" : "Executive Committee | NYFN Gandaki",
    description: locale === "np" ? "राष्ट्रिय युवा संघ नेपाल, गण्डकी प्रदेशको केन्द्रीय नेतृत्व।" : "Meet the central leadership of National Youth Federation Nepal, Gandaki Province.",
  };
}

export default async function ExecutiveCommitteePage({ params }) {
  const { locale } = await params;
  const isNepali = locale === "np";
  
  await connectToDatabase();
  
  // Fetch executive members. For now we fetch all active members sorted by displayOrder
  // In a robust CMS, you would filter by a specific 'isExecutive' or 'level' flag.
  const dbMembers = await Member.find({ status: "Active" })
    .populate("district")
    .sort({ displayOrder: 1, createdAt: -1 })
    .lean();

  const mappedMembers = dbMembers.map(member => ({
    id: member.slug || member._id.toString(),
    name: isNepali && member.name.np ? member.name.np : member.name.en,
    position: isNepali && member.position.np ? member.position.np : member.position.en,
    district: member.district?.name?.en || member.province || "Gandaki",
    photoUrl: member.photo,
    phone: member.phone,
    email: member.email,
    facebook: member.facebook
  }));

  return (
    <main className="min-h-screen bg-background">
      <PageHeader 
        title={isNepali ? "कार्यकारी समिति" : "Executive Committee"}
        subtitle={isNepali ? "राष्ट्रिय युवा संघ नेपाल, गण्डकी प्रदेशको नेतृत्व गर्दै।" : "The dedicated leaders guiding the vision and operations of NYFN in Gandaki Province."}
        breadcrumbItems={[
          { label: isNepali ? "गृहपृष्ठ" : "Home", href: `/${locale}` },
          { label: isNepali ? "कार्यकारी समिति" : "Executive Committee", href: `/${locale}/committees/executive`, active: true }
        ]}
      />

      <section className="py-24 bg-[#F8FAFC] dark:bg-gray-900 transition-colors">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
              {isNepali ? "प्रदेश पदाधिकारीहरू" : "Provincial Office Bearers"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {isNepali ? "वर्तमान कार्यकालका लागि निर्वाचित नेतृत्व।" : "Elected leadership team for the current tenure."}
            </p>
          </div>

          {mappedMembers.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {mappedMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-[20px] bg-white dark:bg-gray-800">
              {isNepali ? "प्रदेश स्तरमा कुनै कार्यकारी सदस्य फेला परेनन्।" : "No executive members found at the provincial level."}
            </div>
          )}

        </div>
      </section>
    </main>
  );
}
