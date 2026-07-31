import { PositionForm } from "@/features/admin/positions/components/PositionForm";
import { PositionService } from "@/services/PositionService";
import { notFound } from "next/navigation";

export const metadata = { title: "Edit Position | NYFN Admin" };

export default async function EditPositionPage({ params }) {
  const { id } = await params;
  const item = await PositionService.getById(id);
  if (!item) notFound();
  
  return <PositionForm initialData={JSON.parse(JSON.stringify(item))} />;
}
