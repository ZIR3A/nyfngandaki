import { LeadershipMessageForm } from "@/features/leadership-messages/components/LeadershipMessageForm";
import { LeadershipMessageService } from "@/services/LeadershipMessageService";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Leadership Message | NYFN Admin",
};

export default async function EditLeadershipMessagePage({ params }) {
  const { id } = await params;
  
  const message = await LeadershipMessageService.getMessageById(id);
  
  if (!message) {
    notFound();
  }

  // Convert to plain object for client component
  const plainMessage = JSON.parse(JSON.stringify(message));

  return <LeadershipMessageForm initialData={plainMessage} />;
}
