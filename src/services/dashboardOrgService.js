import connectToDatabase from "@/lib/mongodb";
import District from "@/models/District";
import Committee from "@/models/Committee";
import Department from "@/models/Department";
import Position from "@/models/Position";
import Member from "@/models/Member";

class DashboardOrgService {
  async getOrganizationOverview(role = "Super Admin", organizationId = null) {
    await connectToDatabase();

    // In a real application, filters would be applied based on the role and organizationId.
    // For this dashboard, we aggregate province-level data as Gandaki.

    const [
      totalDistricts,
      totalCommittees,
      totalDepartments,
      totalPositions,
      totalMembers,
      districtsWithCommittees,
      committeesWithPresidents
    ] = await Promise.all([
      District.countDocuments({}),
      Committee.countDocuments({}),
      Department.countDocuments({}),
      Position.countDocuments({}),
      Member.countDocuments({}),
      // Aggregate to find districts that are assigned to at least one committee
      Committee.distinct("district_id").then(res => res.length),
      // Find members with "President" in their position (approximate health metric)
      // Note: This relies on populating position or checking positions if stored in members
      // For simplicity in this widget, we'll check how many committees have at least 1 member assigned
      Member.distinct("committee_id").then(res => res.length)
    ]);

    // Health Calculations
    const districtSetupPercent = totalDistricts === 0 ? 0 : Math.round((districtsWithCommittees / totalDistricts) * 100);
    
    // For Committee Setup, assume ideally we want 1 committee per district + some municipal/ward committees. 
    // We'll calculate the health as the percentage of committees that have members.
    const committeeSetupPercent = totalCommittees === 0 ? 0 : Math.round((committeesWithPresidents / totalCommittees) * 100);
    
    // Calculate warnings
    const warnings = [];
    
    const districtsWithoutCommittees = totalDistricts - districtsWithCommittees;
    if (districtsWithoutCommittees > 0) {
      warnings.push(`${districtsWithoutCommittees} District${districtsWithoutCommittees > 1 ? 's' : ''} have no Committee assigned.`);
    }

    const emptyCommittees = totalCommittees - committeesWithPresidents;
    if (emptyCommittees > 0) {
      warnings.push(`${emptyCommittees} Committee${emptyCommittees > 1 ? 's' : ''} contain no Members.`);
    }

    if (totalPositions === 0) {
      warnings.push("No Organization Positions have been defined yet.");
    }

    return {
      hierarchy: {
        province: 1,
        districts: totalDistricts,
        committees: totalCommittees,
        departments: totalDepartments,
        members: totalMembers
      },
      health: {
        districtSetup: {
          percent: districtSetupPercent,
          completed: districtsWithCommittees,
          total: totalDistricts
        },
        committeeSetup: {
          percent: committeeSetupPercent,
          completed: committeesWithPresidents,
          total: totalCommittees
        }
      },
      warnings
    };
  }
}

export const dashboardOrgService = new DashboardOrgService();
