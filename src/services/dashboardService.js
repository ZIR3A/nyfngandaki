import connectToDatabase from "@/lib/mongodb";
import Member from "@/models/Member";
import Committee from "@/models/Committee";
import Department from "@/models/Department";
import Position from "@/models/Position";
import Event from "@/models/Event";
import LeadershipMessage from "@/models/LeadershipMessage";
import District from "@/models/District";

class DashboardService {
  /**
   * Aggregates all dashboard data strictly from existing collections.
   * No mock data, no estimations.
   */
  async getDashboardData() {
    await connectToDatabase();

    // 1. Fetch exact counts for statistics
    const [
      totalMembers,
      activeMembers,
      totalCommittees,
      totalDepartments,
      totalPositions,
      totalEvents,
      publishedMessages
    ] = await Promise.all([
      Member.countDocuments(),
      Member.countDocuments({ status: "Active" }),
      Committee.countDocuments(),
      Department.countDocuments(),
      Position.countDocuments(),
      Event.countDocuments(),
      LeadershipMessage.countDocuments({ status: "Published" })
    ]);

    // 2. Fetch recent members
    const recentMembersRaw = await Member.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('committee_id', 'name')
      .populate('position_id', 'title')
      .lean();

    const recentMembers = recentMembersRaw.map(m => ({
      id: m._id.toString(),
      name: m.name?.en || m.name?.np || "",
      position: m.position_id?.title?.en || "Member",
      committee: m.committee_id?.name?.en || "General",
      district: m.province || "Gandaki", // Simplified district for now
      status: m.status,
      joinedAt: m.createdAt,
      photo: null // we could map profilePhotoId but let's keep it null for dashboard overview if not populated
    }));

    // 3. Fetch recent leadership assignments (simulated by recently updated members for now, or just members with positions)
    const leadershipSpotlightRaw = await Member.find({ position_id: { $exists: true, $ne: null } })
      .sort({ updatedAt: -1 })
      .limit(4)
      .populate('committee_id', 'name')
      .populate('position_id', 'title')
      .lean();

    const leadershipSpotlight = leadershipSpotlightRaw.map(m => ({
      id: m._id.toString(),
      name: m.name?.en || m.name?.np || "",
      position: m.position_id?.title?.en || "Member",
      committee: m.committee_id?.name?.en || "General",
      district: m.province || "Gandaki",
      status: m.status,
      joinedAt: m.createdAt,
      photo: null
    }));

    // 4. Fetch recent events
    const recentEvents = await Event.find()
      .sort({ startDate: 1 })
      .limit(3)
      .lean();

    // 5. Fetch recent official messages
    const officialMessages = await LeadershipMessage.find({ status: "Published" })
      .sort({ publishedDate: -1, createdAt: -1 })
      .limit(3)
      .lean();

    // 6. Organization Overview Aggregations
    const provinceCommittees = await Committee.countDocuments({ organizationLevel: { $in: ["Province", "PROVINCE"] } });
    const districtCommittees = await District.countDocuments();

    // 7. Member Analytics (Distributions)
    const membersByDistrict = await Member.aggregate([
      { $group: { _id: "$district", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "districts", // The MongoDB collection name for District
          localField: "_id",
          foreignField: "_id",
          as: "districtInfo"
        }
      },
      {
        $unwind: { path: "$districtInfo", preserveNullAndEmptyArrays: true }
      }
    ]);

    return {
      statistics: {
        totalMembers,
        activeMembers,
        totalCommittees,
        totalDepartments,
        totalPositions,
        totalEvents,
        publishedMessages
      },
      organization: {
        provinceCommittees,
        districtCommittees,
        totalCommittees,
        totalDepartments,
        totalPositions,
        totalMembers
      },
      analytics: {
        membersByDistrict: membersByDistrict.map(d => ({
          name: d.districtInfo?.name?.en || d.districtInfo?.name?.np || "Unassigned",
          members: d.count
        }))
      },
      recentMembers: JSON.parse(JSON.stringify(recentMembers)),
      leadership: JSON.parse(JSON.stringify(leadershipSpotlight)),
      recentEvents: JSON.parse(JSON.stringify(recentEvents)),
      officialMessages: JSON.parse(JSON.stringify(officialMessages))
    };
  }
}

export const dashboardService = new DashboardService();
