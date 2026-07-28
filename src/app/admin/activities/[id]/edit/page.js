import { ActivityForm } from "@/features/activities/components/ActivityForm";
import { ActivityService } from "@/services/ActivityService";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Activity | NYFN Admin",
};

export default async function EditActivityPage({ params }) {
  const { id } = await params;
  let activity = null;

  try {
    activity = await ActivityService.getActivityById(id);
  } catch (error) {
    console.error(error);
  }

  if (!activity) {
    notFound();
  }

  // Convert ObjectId to string for client component serialization
  activity._id = activity._id.toString();

  return <ActivityForm initialData={activity} />;
}
