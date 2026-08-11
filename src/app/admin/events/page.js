import Link from "next/link";
import { Plus, Search, MoreVertical, Edit, Trash2, Copy, Archive, Eye } from "lucide-react";
import { eventService } from "@/features/events/services/eventService";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Events Dashboard | Admin CRM",
};

export default async function AdminEventsDashboard({ searchParams }) {
  const page = parseInt(searchParams?.page || "1", 10);
  const search = searchParams?.search || "";
  
  // Fetch events using service
  const { events, pagination } = await eventService.getEvents({ page, limit: 10, search });

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Events Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage all your organizational events.</p>
        </div>
        <Button asChild variant="crm-primary" size="crm-primary">
          <Link href="/admin/events/new">
            <Plus className="w-4 h-4 mr-2" /> Create Event
          </Link>
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1546B0]"
              placeholder="Search events..."
              defaultValue={search}
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800">
              Filter
            </button>
          </div>
        </div>

      {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th scope="col" className="px-6 py-4">Event Name</th>
                <th scope="col" className="px-6 py-4">Status</th>
                <th scope="col" className="px-6 py-4">Date</th>
                <th scope="col" className="px-6 py-4">Registrations</th>
                <th scope="col" className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">
                    No events found.
                  </td>
                </tr>
              ) : (
                events.map(event => (
                  <tr key={event._id} className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white whitespace-nowrap">{event.title?.en}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">{event.venue?.name?.en}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                        event.status === 'Upcoming' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                        event.status === 'Ongoing' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        event.status === 'Completed' ? 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      }`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(event.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {event.isRegistrationOpen ? (
                        <span><span className="font-semibold text-gray-900 dark:text-white">0</span> / {event.capacity || '∞'}</span>
                      ) : (
                        <span className="text-gray-400">Closed</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/events/${event.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Preview">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link href={`/admin/events/${event._id}/edit`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 cursor-pointer" title="Edit">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
          </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {pagination?.totalPages > 1 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Showing page {pagination.page} of {pagination.totalPages}
            </span>
            <div className="flex gap-1">
              {/* Pagination controls would go here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}




