import { DistrictForm } from "@/features/admin/districts/components/DistrictForm";
import { DistrictService } from "@/services/DistrictService";
import { notFound } from "next/navigation";

export default async function EditDistrictPage({ params }) {
  const { id } = await params;
  const district = await DistrictService.getById(id);

  if (!district) {
    notFound();
  }

  // Need to parse/stringify to pass to Client Component safely
  const initialData = JSON.parse(JSON.stringify(district));

  return (
    <div className="py-6">
      <DistrictForm initialData={initialData} />
    </div>
  );
}
