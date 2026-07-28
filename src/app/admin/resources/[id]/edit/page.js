import { ResourceForm } from "@/features/resources/components/ResourceForm";
import { ResourceService } from "@/services/ResourceService";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Resource | NYFN Admin",
};

export default async function EditResourcePage({ params }) {
  const { id } = await params;
  let resource = null;

  try {
    resource = await ResourceService.getResourceById(id);
  } catch (error) {
    console.error(error);
  }

  if (!resource) {
    notFound();
  }

  // Convert ObjectId to string for client component serialization
  resource._id = resource._id.toString();

  return <ResourceForm initialData={resource} />;
}
