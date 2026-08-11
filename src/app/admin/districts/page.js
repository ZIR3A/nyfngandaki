import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import { DistrictService } from "@/services/DistrictService";
import { DeleteDistrictButton } from "@/features/admin/districts/components/DeleteDistrictButton";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function DistrictsPage() {
  const districts = await DistrictService.getAll({}); // fetch all districts including inactive

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Districts</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage districts and their descriptions.</p>
        </div>
        <Button asChild variant="crm-primary" size="crm-primary">
          <Link href="/admin/districts/new">
            <Plus className="w-4 h-4 mr-2" />
            Add District
          </Link>
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th scope="col" className="px-6 py-4">Name (EN/NP)</th>
                <th scope="col" className="px-6 py-4">Slug</th>
                <th scope="col" className="px-6 py-4 text-center">Status</th>
                <th scope="col" className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {districts.map((district) => (
                <tr key={district._id} className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    <div>{district.name?.en}</div>
                    <div className="text-xs text-gray-400">{district.name?.np}</div>
                  </td>
                  <td className="px-6 py-4">
                    {district.slug}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      district.status === 'Active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                    }`}>
                      {district.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/districts/${district._id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 cursor-pointer" title="Edit">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <DeleteDistrictButton id={district._id.toString()} />
                    </div>
                  </td>
                </tr>
              ))}

              {districts.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    No districts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}



