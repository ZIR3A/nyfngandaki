import { DashboardDistributionChart } from "./DashboardDistributionChart";
import { DashboardAnalyticsEmptyState } from "./DashboardAnalyticsEmptyState";

export function DashboardMemberAnalytics({ data }) {
  if (!data || !data.membersByDistrict || data.membersByDistrict.length === 0) {
    return <DashboardAnalyticsEmptyState />;
  }

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      {/* Retain only real demographic grouping pipelines */}
      <DashboardDistributionChart data={data.membersByDistrict} />
    </div>
  );
}
