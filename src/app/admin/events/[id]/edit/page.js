import EditEventForm from "@/features/events/components/admin/EditEventForm";
import { EventService } from "@/services/EventService";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Event | NYFN Admin",
};

export default async function EditEventPage({ params }) {
  const { id } = await params;
  let event = null;

  try {
    event = await EventService.getEventById(id);
  } catch (error) {
    console.error(error);
  }

  if (!event) {
    notFound();
  }

  // Deeply serialize the entire object to avoid Server to Client Component reference errors
  const serializedEvent = JSON.parse(JSON.stringify(event));

  return <EditEventForm event={serializedEvent} />;
}
