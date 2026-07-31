import { CommitteeForm } from "@/features/admin/committees/components/CommitteeForm";
import { CommitteeService } from "@/services/CommitteeService";
import { notFound } from "next/navigation";

export const metadata = { title: "Edit Committee | NYFN Admin" };

export default async function EditCommitteePage({ params }) {
  const { id } = await params;
  const item = await CommitteeService.getById(id);
  if (!item) notFound();
  
  return <CommitteeForm initialData={JSON.parse(JSON.stringify(item))} />;
}
