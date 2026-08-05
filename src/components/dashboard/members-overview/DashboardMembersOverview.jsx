import { DashboardRecentMembers } from "./DashboardRecentMembers";
import { DashboardLeadershipSpotlight } from "./DashboardLeadershipSpotlight";
import { DashboardMembersEmptyState } from "./DashboardMembersEmptyState";
import { Calendar, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";

export function DashboardMembersOverview({ recentMembers, leadership, recentEvents, officialMessages }) {
  if (!recentMembers?.length && !leadership?.length && !recentEvents?.length && !officialMessages?.length) {
    return <DashboardMembersEmptyState />;
  }

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Left Column (8 cols on XL) - Recent Members & Events */}
        <div className="xl:col-span-8 flex flex-col gap-6 lg:gap-8">
          {recentMembers?.length > 0 && (
            <DashboardRecentMembers members={recentMembers} />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Recent Events Inline Component */}
            {recentEvents?.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full">
                <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    Upcoming Events
                  </h3>
                  <Link href="/admin/events" className="text-xs text-[#1546B0] dark:text-blue-400 hover:underline">View All</Link>
                </div>
                <div className="p-0 flex-1 flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
                  {recentEvents.map(event => (
                    <div key={event._id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-1">{event.title?.en}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{new Date(event.startDate).toLocaleDateString()}</p>
                      </div>
                      <Link href={`/admin/events/${event._id}`} className="text-slate-400 hover:text-[#1546B0]">
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Official Messages Inline Component */}
            {officialMessages?.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full">
                <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-teal-500" />
                    Official Messages
                  </h3>
                  <Link href="/admin/leadership-messages" className="text-xs text-[#1546B0] dark:text-blue-400 hover:underline">View All</Link>
                </div>
                <div className="p-0 flex-1 flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
                  {officialMessages.map(msg => (
                    <div key={msg._id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-1">{msg.leaderName?.en}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{msg.designation?.en}</p>
                      </div>
                      <Link href={`/admin/leadership-messages/${msg._id}`} className="text-slate-400 hover:text-[#1546B0]">
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (4 cols on XL) - Leadership */}
        <div className="xl:col-span-4 flex flex-col gap-6 lg:gap-8">
          {leadership?.length > 0 && (
            <DashboardLeadershipSpotlight leaders={leadership} />
          )}
        </div>

      </div>
    </div>
  );
}
