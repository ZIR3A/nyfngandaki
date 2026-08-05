import { quickActionsConfig } from "./quickActionsConfig";
import { DashboardQuickActionCard } from "./DashboardQuickActionCard";
import { DashboardQuickActionEmptyState } from "./DashboardQuickActionEmptyState";

export function DashboardQuickActions({ user }) {
  // Determine user role (fallback to Super Admin for safety if undefined)
  const role = user?.role || "Super Admin";

  // Filter actions based on the user's role
  const availableActions = quickActionsConfig.filter(action => 
    action.roles.includes(role)
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {availableActions.length > 0 ? (
        availableActions.map(action => (
          <DashboardQuickActionCard key={action.id} action={action} />
        ))
      ) : (
        <DashboardQuickActionEmptyState />
      )}
    </div>
  );
}
