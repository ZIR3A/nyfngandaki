import Link from "next/link";
import { Calendar, Users, Activity, ChevronRight, Ticket } from "lucide-react";
import { eventService } from "@/features/events/services/eventService";
import { registrationService } from "@/features/events/services/registrationService";

export const metadata = {
  title: "Admin Dashboard | NYFN Gandaki",
};

export default async function AdminDashboard() {
  
  let eventsData = null;
  let upcomingEvents = [];
  
  try {
    // Fetch upcoming events
    eventsData = await eventService.getEvents({ limit: 3, sort: 'startDate' });
    upcomingEvents = eventsData.events;
  } catch (error) {
    console.error("Failed to fetch dashboard data", error);
  }

  // Calculate simple stats
  const totalUpcoming = eventsData?.pagination?.total || 0;
  
  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <Activity className="w-6 h-6 text-[#1546B0]" />
          Dashboard Overview
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Welcome back to the NYFN Gandaki Control Panel.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6 text-[#1546B0] dark:text-blue-400" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">{totalUpcoming}</div>
            <div className="text-sm font-medium text-slate-500">Upcoming Events</div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center shrink-0">
            <Ticket className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">Live</div>
            <div className="text-sm font-medium text-slate-500">Registration System</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 opacity-50 cursor-not-allowed">
          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-slate-500" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">--</div>
            <div className="text-sm font-medium text-slate-500">Total Members (TBA)</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Events Widget */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
            <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#1546B0]" />
              Upcoming Events
            </h2>
            <Link href="/admin/events" className="text-sm font-medium text-[#1546B0] dark:text-blue-400 hover:underline">
              View All
            </Link>
          </div>
          
          <div className="p-0 flex-1">
            {upcomingEvents.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                No upcoming events found.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {upcomingEvents.map((event) => (
                  <div key={event._id} className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1">
                        {event.title?.en}
                      </h4>
                      <p className="text-sm text-slate-500 mt-1">
                        {new Date(event.startDate).toLocaleDateString()} &middot; {event.status}
                      </p>
                    </div>
                    <Link 
                      href={`/admin/events/${event._id}`}
                      className="p-2 text-slate-400 hover:text-[#1546B0] dark:hover:text-blue-400 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Notifications / Activity Widget */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
            <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#1546B0]" />
              System Notifications
            </h2>
          </div>
          
          <div className="p-8 text-center flex-1 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4 text-[#1546B0]">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">All Systems Operational</h3>
            <p className="text-slate-500 text-sm">
              Event Module, Registration System, and Media Galleries are online and fully integrated.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}

// Temporary icon for notifications
function CheckCircle(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}
