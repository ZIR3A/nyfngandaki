import { DashboardOrganizationHierarchy } from "./DashboardOrganizationHierarchy";
import { DashboardOrganizationSummary } from "./DashboardOrganizationSummary";
import { DashboardOrganizationEmptyState } from "./DashboardOrganizationEmptyState";

export function DashboardOrganizationOverview({ data }) {
  if (!data || data.totalCommittees === 0) {
    return <DashboardOrganizationEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      {/* Left Column - Hierarchy Flow */}
      <div className="lg:col-span-1">
        <DashboardOrganizationHierarchy hierarchy={data} />
      </div>

      {/* Right Column - Summary Cards */}
      <div className="lg:col-span-1">
        <DashboardOrganizationSummary hierarchy={data} />
      </div>
    </div>
  );
}
