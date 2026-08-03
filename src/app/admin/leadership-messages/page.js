import { LeadershipMessageService } from "@/services/LeadershipMessageService";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminLeadershipMessagesTable } from "@/features/leadership-messages/components/AdminLeadershipMessagesTable";

export const metadata = {
  title: "Manage Leadership Messages | NYFN Admin",
};

export default async function AdminLeadershipMessagesPage() {
  const result = await LeadershipMessageService.getCrmMessages({ limit: 1000, sortField: "display_order", sortOrder: "asc" });
  
  // Convert to plain objects for the client component
  const plainMessages = JSON.parse(JSON.stringify(result.data));

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Leadership Messages</h1>
          <p className="text-gray-500 text-sm mt-1">Manage messages displayed from organizational leaders.</p>
        </div>
        <Link href="/admin/leadership-messages/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Message
          </Button>
        </Link>
      </div>

      <AdminLeadershipMessagesTable messages={plainMessages} />
    </div>
  );
}
