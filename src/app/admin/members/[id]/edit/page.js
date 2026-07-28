import { MemberForm } from "@/features/members/components/MemberForm";
import { MemberService } from "@/services/MemberService";
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

  return <MemberForm initialData={plainMember} />;
}
