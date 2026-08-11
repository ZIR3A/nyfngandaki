import Link from "next/link";
import { Plus, Search, Edit, Trash2, Eye, Bell } from "lucide-react";
import { NoticeService } from "@/services/NoticeService";
import DeleteNoticeButton from "./components/DeleteNoticeButton"; // We'll create a client component for deletion
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Notices Dashboard | Admin CRM",
};

export default async function AdminNoticesDashboard({ searchParams }) {
  const page = parseInt(searchParams?.page || "1", 10);
  const search = searchParams?.search || "";
  
  // Construct query
  const query = {};
  if (search) {
    query['$or'] = [
      { 'title.en': { $regex: search, $options: 'i' } },
      { 'title.np': { $regex: search, $options: 'i' } }
    ];
  }

  // Fetch notices using service
  const { notices, pages, total } = await NoticeService.getAll(query, { page, limit: 10 });

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Notices Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage announcements displayed on the public website.</p>
        </div>
        <Button asChild variant="crm-primary" size="crm-primary">
          <Link href="/admin/notices/create">
            <Plus className="w-4 h-4 mr-2" /> Create Notice
          </Link>
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <form action="/admin/notices" method="GET">
              <input
                name="search"
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1546B0] text-[#111827] dark:text-white"
                placeholder="Search notices..."
                defaultValue={search}
              />
            </form>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th scope="col" className="px-6 py-4">Notice</th>
                <th scope="col" className="px-6 py-4">Type</th>
                <th scope="col" className="px-6 py-4">Priority</th>
                <th scope="col" className="px-6 py-4">Status</th>
                <th scope="col" className="px-6 py-4">Popup</th>
                <th scope="col" className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notices.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-500">
                    No notices found.
                  </td>
                </tr>
              ) : (
                notices.map(notice => (
                  <tr key={notice._id} className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white line-clamp-1">{notice.title?.en}</div>
                      <div className="text-xs text-gray-500 line-clamp-1">{notice.title?.np}</div>
                    </td>
                    <td className="px-6 py-4 capitalize text-gray-600 dark:text-gray-400">
                      {notice.type}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider ${
                        notice.priority === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                        notice.priority === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                        notice.priority === 'normal' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                        'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        {notice.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                        notice.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        notice.status === 'draft' ? 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300' :
                        notice.status === 'scheduled' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      }`}>
                        {notice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {notice.popupEnabled ? (
                        <span className="inline-flex items-center text-xs text-green-600 dark:text-green-400 font-medium">
                          <Bell className="w-3 h-3 mr-1" /> Enabled
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">Disabled</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/notices/${notice._id}/edit`} className="inline-flex items-center justify-center h-8 w-8 rounded-md text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer" title="Edit">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <DeleteNoticeButton id={notice._id.toString()} title={notice.title?.en} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {pages > 1 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Showing page {page} of {pages}
            </span>
            <div className="flex gap-1">
               {/* basic prev/next for now */}
               {page > 1 && (
                 <Link href={`/admin/notices?page=${page - 1}${search ? '&search='+search : ''}`} className="px-3 py-1 border rounded hover:bg-slate-50 dark:hover:bg-slate-800">
                   Prev
                 </Link>
               )}
               {page < pages && (
                 <Link href={`/admin/notices?page=${page + 1}${search ? '&search='+search : ''}`} className="px-3 py-1 border rounded hover:bg-slate-50 dark:hover:bg-slate-800">
                   Next
                 </Link>
               )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}




