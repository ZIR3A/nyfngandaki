import { BannerService } from "@/services/BannerService";
import Link from "next/link";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Manage Banners | NYFN Admin",
};

export default async function AdminBannersPage() {
  const banners = await BannerService.getAll();

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Banners Management</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">Manage homepage slider banners.</p>
        </div>
        <Link href="/admin/banners/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Banner
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
              placeholder="Search banners..."
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
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {banners.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500 dark:text-slate-400">
                    No banners found.
                  </td>
                </tr>
              ) : (
                banners.map((banner) => (
                  <tr key={banner._id.toString()} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-slate-200 truncate max-w-xs">
                      {banner.title?.en || "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-slate-400">
                      {banner.order}
                    </td>
                    <td className="px-6 py-4">
                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                         banner.isActive ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' : 'bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-slate-300'
                       }`}>
                         {banner.isActive ? 'Active' : 'Inactive'}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/banners/${banner._id.toString()}/edit`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer" title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <form action={async () => {
                           "use server";
                           const { deleteBannerAction } = await import("@/actions/banner.actions");
                           await deleteBannerAction(banner._id.toString());
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
