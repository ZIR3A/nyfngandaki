import { DashboardStatisticCard } from "./DashboardStatisticCard";
import { DashboardStatisticsGrid } from "./DashboardStatisticsGrid";
import { Users, Building, FileText, Calendar, CheckCircle } from "lucide-react";

export function DashboardStatistics({ data }) {
  if (!data) return null;

  // Real API counts
  const stats = [
    {
      title: "Total Members",
      value: data.totalMembers || 0,
      icon: Users,
      trend: "neutral",
      color: "blue"
    },
    {
      title: "Active Members",
      value: data.activeMembers || 0,
      icon: CheckCircle,
      trend: "neutral",
      color: "green"
    },
    {
      title: "Committees",
      value: data.totalCommittees || 0,
      icon: Building,
      trend: "neutral",
      color: "purple"
    },
    {
      title: "Active Events",
      value: data.totalEvents || 0,
      icon: Calendar,
      trend: "neutral",
      color: "indigo"
    },
    {
      title: "Official Messages",
      value: data.publishedMessages || 0,
      icon: FileText,
      trend: "neutral",
      color: "teal"
    }
  ];

  return (
    <DashboardStatisticsGrid>
      {stats.map((stat, idx) => (
        <DashboardStatisticCard 
          key={idx}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          trend={stat.trend}
          color={stat.color}
        />
      ))}
    </DashboardStatisticsGrid>
  );
}
