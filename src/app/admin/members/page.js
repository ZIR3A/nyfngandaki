import { MemberService } from "@/services/MemberService";
import Link from "next/link";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteMemberButton } from "@/features/members/components/DeleteMemberButton";

export const metadata = {
  title: "Manage Members | NYFN Admin",
};

export default async function AdminMembersPage() {
  const members = await MemberService.getAllMembers();

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Members Directory</h1>
          <p className="text-gray-500 text-sm mt-1">Manage organization members and their profiles.</p>
        </div>
        <Link href="/admin/members/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/50">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search members..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-600 font-bold border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Name (English)</th>
                <th className="px-6 py-4">Position</th>
                <th className="px-6 py-4">District</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {members.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    No members found.
                  </td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr key={member._id.toString()} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {member.name?.en || "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {member.position?.en || "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {member.district?.name?.en || member.province || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/members/${member._id.toString()}/edit`}>
                          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-600" title="Edit Member">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <DeleteMemberButton id={member._id.toString()} name={member.name?.en || "this member"} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
