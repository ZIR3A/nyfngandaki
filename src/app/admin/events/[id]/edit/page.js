import { EventForm } from "@/features/events/components/EventForm";
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

  // Convert ObjectId to string for client component serialization
  event._id = event._id.toString();

  return <EventForm initialData={event} />;
}
