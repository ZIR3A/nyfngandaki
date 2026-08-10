import { notFound } from "next/navigation";
import { ContactMessageService } from "@/services/ContactMessageService";
import { AdminContactMessageDetail } from "@/features/contact/components/admin/AdminContactMessageDetail";

export const metadata = {
  title: "Message Details | NYFN Admin",
};

export default async function AdminContactMessageDetailPage({ params }) {
  const { id } = await params;
  
  const message = await ContactMessageService.getMessageById(id);
  
  if (!message) {
    notFound();
  }

  // If status is Unread, we auto-update to Read when they view it.
  if (message.status === "Unread") {
    await ContactMessageService.updateStatus(id, "Read");
    message.status = "Read"; // Update local object for the view
  }

  return (
    <div>
      <AdminContactMessageDetail message={message} />
    </div>
  );
}
