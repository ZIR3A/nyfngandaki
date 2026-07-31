import { notFound } from "next/navigation";
import { cache } from "react";
import { MemberService } from "@/services/MemberService";
import { MemberProfileLayout } from "@/features/members/components/MemberProfileLayout";

// Deduplicate the DB fetch for both generateMetadata and the Page component
const getMember = cache(async (slug) => {
  return await MemberService.getMemberBySlug(slug);
});

const getRelated = cache(async (districtId, currentMemberId) => {
  return await MemberService.getRelatedMembers(districtId, currentMemberId);
});

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const isNepali = locale === "np";
  
  const member = await getMember(slug);
  if (!member) {
    return {
      title: isNepali ? "सदस्य भेटिएन | NYFN Gandaki" : "Member Not Found | NYFN Gandaki",
    };
  }

  const name = isNepali ? member.name?.np || member.name?.en : member.name?.en;
  
  let position = "";
  if (member.position_id && member.position_id.name) {
    position = isNepali ? member.position_id.name.np || member.position_id.name.en : member.position_id.name.en;
  } else if (member.position) {
    position = isNepali ? member.position.np || member.position.en : member.position.en;
  }
  
  const title = `${name} - ${position} | NYFN Gandaki`;
  const description = isNepali 
    ? `${name}, ${position}, राष्ट्रिय युवा संघ नेपाल, गण्डकी प्रदेश कमिटी।` 
    : `${name}, ${position}, National Youth Federation Nepal, Gandaki Province Committee.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      url: `https://gandaki.nyfn.org.np/${locale}/members/${slug}`,
      images: [
        {
          url: member.photo || "/og-image-default.jpg",
          width: 800,
          height: 800,
          alt: name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [member.photo || "/og-image-default.jpg"],
    },
  };
}

export default async function MemberProfilePage({ params }) {
  const { slug, locale } = await params;
  const isNepali = locale === "np";

  const member = await getMember(slug);
  
  if (!member) {
    notFound();
  }

  // Fetch related members from the same district
  const relatedMembers = member.district 
    ? await getRelated(member.district._id, member._id) 
    : [];

  return (
    <main className="w-full">
      <MemberProfileLayout 
        member={member} 
        relatedMembers={relatedMembers} 
        isNepali={isNepali} 
      />
    </main>
  );
}
