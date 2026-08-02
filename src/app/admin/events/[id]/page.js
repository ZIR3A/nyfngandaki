import { eventService } from "@/features/events/services/eventService";
import EditEventForm from "@/features/events/components/admin/EditEventForm";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Event | NYFN Gandaki Admin",
};

export default async function EditEventPage({ params }) {
  const { id } = await params;
  
  // In a real app we'd wrap this in a try/catch, or let the error boundary handle it
  let event = null;
  try {
    event = await eventService.getEventById(id);
  } catch (e) {
    console.error("Failed to load event:", e);
  }

  if (!event) {
    notFound();
  }

  // Need to parse to JSON and back to remove Mongoose Document prototypes for Client Component
  const safeEvent = JSON.parse(JSON.stringify(event));

  return <EditEventForm event={safeEvent} />;
}
