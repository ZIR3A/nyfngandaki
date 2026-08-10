import { ResourceService } from "@/services/ResourceService";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Manage Resources | NYFN Admin",
};

export default async function AdminResourcesPage() {
  const resources = await ResourceService.getAllResources(true);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Resources Management</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">Manage documents, PDFs, and guidelines.</p>
        </div>
        <Link href="/admin/resources/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Resource
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between bg-gray-50/50 dark:bg-slate-900/50">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-slate-500" />
            <input 
              type="text"
              placeholder="Search resources..."
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-slate-900/50 text-gray-600 dark:text-slate-400 font-bold border-b border-gray-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4">Title (English)</th>
                <th className="px-6 py-4">File Size</th>
                <th className="px-6 py-4">Visibility</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {resources.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500 dark:text-slate-400">
                    No resources found.
                  </td>
                </tr>
              ) : (
                resources.map((resource) => (
                  <tr key={resource._id.toString()} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-slate-200 truncate max-w-xs">
                      {resource.title?.en || "-"}
                      {resource.badges && resource.badges.length > 0 && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-slate-300 uppercase">
                          {resource.badges[0]}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-slate-400">
                      {resource.fileSize || "-"}
                    </td>
                    <td className="px-6 py-4">
                      {resource.visibility ? (
                        <span className="flex items-center text-green-600 dark:text-green-400"><Eye className="w-4 h-4 mr-1"/> Visible</span>
                      ) : (
                        <span className="flex items-center text-gray-400 dark:text-slate-500"><EyeOff className="w-4 h-4 mr-1"/> Hidden</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/resources/${resource._id.toString()}/edit`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer" title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <form action={async () => {
                           "use server";
                           const { deleteResource } = await import("@/features/resources/actions/resource.actions");
                           await deleteResource(resource._id.toString());
                        }}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30 cursor-pointer" title="Delete" type="submit">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </form>
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
