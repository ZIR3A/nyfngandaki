import { MemberService } from "@/services/MemberService";
import { DistrictService } from "@/services/DistrictService";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminMembersTable } from "@/features/members/components/AdminMembersTable";

export const metadata = {
  title: "Manage Members | NYFN Admin",
};

export default async function AdminMembersPage() {
  const members = await MemberService.getAllMembers();
  const districts = await DistrictService.getAll();

  // Convert to plain objects for the client component
  const plainMembers = JSON.parse(JSON.stringify(members));
  const plainDistricts = JSON.parse(JSON.stringify(districts));

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Members Directory</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">Manage organization members and their profiles.</p>
        </div>
        <Button asChild variant="crm-primary" size="crm-primary">
          <Link href="/admin/members/new">
            <Plus className="w-4 h-4 mr-2" /> Add Member
          </Link>
        </Button>
      </div>

      <AdminMembersTable members={plainMembers} districts={plainDistricts} />
    </div>
  );
}



