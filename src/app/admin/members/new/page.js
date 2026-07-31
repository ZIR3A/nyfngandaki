import { MemberForm } from "@/features/members/components/MemberForm";
import { DistrictService } from "@/services/DistrictService";
import { CommitteeService } from "@/services/CommitteeService";
import { PositionService } from "@/services/PositionService";

export const metadata = {
  title: "Add New Member | NYFN Admin",
};

export default async function NewMemberPage() {
  const districts = await DistrictService.getAll();
  const plainDistricts = JSON.parse(JSON.stringify(districts));

  const committees = await CommitteeService.getAll();
  const plainCommittees = JSON.parse(JSON.stringify(committees));

  const positions = await PositionService.getAll();
  const plainPositions = JSON.parse(JSON.stringify(positions));

  return (
    <MemberForm 
      districts={plainDistricts} 
      committees={plainCommittees} 
      positions={plainPositions} 
    />
  );
}
