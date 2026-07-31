import { MemberForm } from "@/features/members/components/MemberForm";
import { MemberService } from "@/services/MemberService";
import { DistrictService } from "@/services/DistrictService";
import { CommitteeService } from "@/services/CommitteeService";
import { PositionService } from "@/services/PositionService";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Member | NYFN Admin",
};

export default async function EditMemberPage({ params }) {
  const { id } = await params;
  const member = await MemberService.getMemberById(id);

  if (!member) {
    notFound();
  }

  // Convert Mongoose document to plain object for the client component
  const plainMember = JSON.parse(JSON.stringify(member));

  const districts = await DistrictService.getAll();
  const plainDistricts = JSON.parse(JSON.stringify(districts));

  const committees = await CommitteeService.getAll();
  const plainCommittees = JSON.parse(JSON.stringify(committees));

  const positions = await PositionService.getAll();
  const plainPositions = JSON.parse(JSON.stringify(positions));

  return (
    <MemberForm 
      initialData={plainMember} 
      districts={plainDistricts}
      committees={plainCommittees} 
      positions={plainPositions}
    />
  );
}
