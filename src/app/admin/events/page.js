import { EventService } from "@/services/EventService";
import Link from "next/link";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Manage Events | NYFN Admin",
};

export default async function AdminEventsPage() {
  const events = await EventService.getAllEvents();

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Events Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage organization events, workshops, and programs.</p>
        </div>
        <Link href="/admin/events/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
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
              placeholder="Search events..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-600 font-bold border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Title (English)</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Venue</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    No events found.
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event._id.toString()} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 truncate max-w-xs">
                      {event.title?.en || "-"}
                      {event.featured && <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">Featured</span>}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-gray-600 truncate max-w-[150px]">
                      {event.venue?.en || "-"}
                    </td>
                    <td className="px-6 py-4">
                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                         event.status === 'Upcoming' ? 'bg-green-100 text-green-800' : 
                         event.status === 'Ongoing' ? 'bg-amber-100 text-amber-800' : 
                         'bg-gray-100 text-gray-800'
                       }`}>
                         {event.status}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/events/${event._id.toString()}/edit`}>
                          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-600">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <form action={async () => {
                           "use server";
                           const { deleteEvent } = await import("@/features/events/actions/event.actions");
                           await deleteEvent(event._id.toString());
                        }}>
                          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-red-600" type="submit">
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
