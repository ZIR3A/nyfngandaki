import { DashboardContainer } from "@/components/dashboard/DashboardContainer";
import { DashboardSection } from "@/components/dashboard/DashboardSection";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { DashboardWidget, DashboardWidgetHeader, DashboardWidgetBody } from "@/components/dashboard/DashboardWidget";

// Import Widgets
import { DashboardStatistics } from "@/components/dashboard/statistics/DashboardStatistics";
import { DashboardQuickActions } from "@/components/dashboard/quick-actions/DashboardQuickActions";
import { DashboardOrganizationOverview } from "@/components/dashboard/organization/DashboardOrganizationOverview";
import { DashboardMemberAnalytics } from "@/components/dashboard/analytics/DashboardMemberAnalytics";
import { DashboardMembersOverview } from "@/components/dashboard/members-overview/DashboardMembersOverview";

import { dashboardService } from "@/services/dashboardService";

export const metadata = {
  title: "Admin Dashboard | NYFN Gandaki",
  description: "Central dashboard for NYFN Gandaki CRM",
};

export default async function DashboardPage() {
  
  let dashboardData = null;
  let error = null;
  
  try {
    dashboardData = await dashboardService.getDashboardData();
  } catch (err) {
    console.error("Dashboard Server Fetch Error:", err);
    error = "Failed to load dashboard data. Please check your database connection.";
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col pt-6">
      <DashboardContainer>
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        {dashboardData && (
          <div className="flex flex-col gap-6 lg:gap-8">
            
            <DashboardSection 
              title="Overview Statistics" 
              description="Key metrics across the organization."
            >
              <DashboardStatistics data={dashboardData.statistics} />
            </DashboardSection>

            <DashboardSection 
              title="Quick Actions" 
              description="Frequently used CRM operations."
            >
              <DashboardQuickActions />
            </DashboardSection>

            <DashboardSection 
              title="Organization & Analytics" 
              description="Organizational structure and member insights."
            >
              <DashboardGrid className="grid-cols-1 lg:grid-cols-2">
                <DashboardWidget>
                  <DashboardWidgetHeader title="Organization Overview" />
                  <DashboardWidgetBody>
                    <DashboardOrganizationOverview data={dashboardData.organization} />
                  </DashboardWidgetBody>
                </DashboardWidget>

                <DashboardWidget>
                  <DashboardWidgetHeader title="Member Analytics" />
                  <DashboardWidgetBody>
                    <DashboardMemberAnalytics data={dashboardData.analytics} />
                  </DashboardWidgetBody>
                </DashboardWidget>
              </DashboardGrid>
            </DashboardSection>

            <DashboardSection 
              title="Recent Activity" 
              description="Latest members, leadership assignments, and events."
            >
              <DashboardMembersOverview 
                recentMembers={dashboardData.recentMembers}
                leadership={dashboardData.leadership}
                recentEvents={dashboardData.recentEvents}
                officialMessages={dashboardData.officialMessages}
              />
            </DashboardSection>

          </div>
        )}
      </DashboardContainer>
    </div>
  );
}
