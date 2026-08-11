import { CommitteeService } from "@/services/CommitteeService";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteCommitteeButton } from "@/features/admin/committees/components/DeleteCommitteeButton";

export const metadata = { title: "Manage Committees | NYFN Admin" };

export default async function AdminCommitteesPage() {
  const committees = await CommitteeService.getAll();

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Committees</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">Manage organizational committees.</p>
        </div>
        <Button asChild variant="crm-primary" size="crm-primary">
          <Link href="/admin/committees/new">
            <Plus className="w-4 h-4 mr-2" /> Add Committee
          </Link>
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th scope="col" className="px-6 py-4">Name</th>
                <th scope="col" className="px-6 py-4">Level</th>
                <th scope="col" className="px-6 py-4">Departments</th>
                <th scope="col" className="px-6 py-4">Display Order</th>
                <th scope="col" className="px-6 py-4">Status</th>
                <th scope="col" className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {committees.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500 dark:text-slate-400">No committees found.</td>
                </tr>
              ) : (
                committees.map((item) => (
                  <tr key={item._id.toString()} className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{item.name?.en}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-slate-400">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold border ${
                        item.organizationLevel === 'Central' ? 'bg-red-50 text-red-700 border-red-200' : 
                        (item.organizationLevel === 'Province' || item.organizationLevel === 'PROVINCE') ? 'bg-purple-50 text-purple-700 border-purple-200' : 
                        'bg-orange-50 text-orange-700 border-orange-200'
                      }`}>
                        {item.organizationLevel || "Province"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-slate-400 font-medium">
                      {item.departmentCount || 0}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-slate-400 font-mono">{item.displayOrder || 0}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        item.status === 'Active' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' : 'bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-slate-300'
                      }`}>{item.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/committees/${item._id.toString()}/edit?tab=departments`}>
                          <Button variant="outline" size="sm" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 border-blue-200 dark:border-blue-800">
                            Manage Departments
                          </Button>
                        </Link>
                        <Link href={`/admin/committees/${item._id.toString()}/edit`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer" title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <DeleteCommitteeButton id={item._id.toString()} />
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
