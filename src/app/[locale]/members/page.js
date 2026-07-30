import { PageHeader } from "@/components/shared/PageHeader";
import { MembersDirectoryClient } from "@/features/members/components/MembersDirectoryClient";
import connectToDatabase from "@/lib/mongodb";
import Member from "@/models/Member";
import District from "@/models/District";
import { MemberService } from "@/services/MemberService";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: locale === "np" ? "सदस्य निर्देशिका | NYFN Gandaki" : "Members Directory | NYFN Gandaki",
    description: locale === "np" ? "राष्ट्रिय युवा संघ नेपाल गण्डकी प्रदेशका सदस्यहरूको विवरण" : "Directory of NYFN Gandaki Province Members",
  };
}

export default async function MembersDirectoryPage({ params }) {
  const { locale } = await params;
  const isNepali = locale === "np";
  
  // Fetch active members with resolved asset URLs
  const membersData = await MemberService.getAllMembers({ status: "Active" });

  // Convert MongoDB ObjectIds to strings to pass to Client Component safely
  const serializedMembers = membersData.map(member => {
    const serialized = { ...member };
    if (serialized._id) {
      serialized._id = serialized._id.toString();
    }
    if (serialized.district) {
      serialized.district = {
        ...serialized.district,
        _id: serialized.district._id?.toString()
      };
    }
    return serialized;
  });

  return (
    <main className="min-h-screen bg-background">
      <PageHeader 
        title={isNepali ? "सदस्य निर्देशिका" : "Members Directory"}
        subtitle={isNepali ? "हाम्रा सक्रिय सदस्यहरूको विवरण" : "Browse the complete directory of our active members across the province."}
        breadcrumbItems={[
          { label: isNepali ? "गृहपृष्ठ" : "Home", href: `/${locale}` },
          { label: isNepali ? "सदस्यहरू" : "Members", href: `/${locale}/members`, active: true }
        ]}
      />

      <MembersDirectoryClient initialMembers={serializedMembers} isNepali={isNepali} />
    </main>
  );
}
