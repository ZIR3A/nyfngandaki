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
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Leadership Messages</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">Manage messages displayed from organizational leaders.</p>
        </div>
        <Button asChild variant="crm-primary" size="crm-primary">
          <Link href="/admin/leadership-messages/new">
            <Plus className="w-4 h-4 mr-2" /> Add Message
          </Link>
        </Button>
      </div>

      <AdminLeadershipMessagesTable messages={plainMessages} />
    </div>
  );
}
