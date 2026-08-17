import { NextResponse } from "next/server";
import { MemberService } from "@/services/MemberService";
import Committee from "@/models/Committee";
import Department from "@/models/Department";
import connectToDatabase from "@/lib/mongodb";

export async function GET() {
  try {
    await connectToDatabase();

    // 1. Fetch all active committees ordered by displayOrder
    const committees = await Committee.find({ status: "Active" }).sort({ displayOrder: 1 }).lean();

    const results = [];

    // 2. For each committee, fetch its active members
    for (const committee of committees) {
      let filters = { status: "Active" };

      // Exact matching for organization level
      if (committee.organizationLevel === "District" || committee.organizationLevel === "DISTRICT") {
        filters.organizationLevel = { $in: ["District", "DISTRICT"] };
      } else if (committee.organizationLevel === "Province" || committee.organizationLevel === "PROVINCE") {
        filters.organizationLevel = { $in: ["Province", "PROVINCE"] };
      } else {
        filters.organizationLevel = committee.organizationLevel;
      }

      // We just use simple find from Member, but we want populated data.
      // So we use MemberService.getAllMembers with the specific filter.
      const members = await MemberService.getAllMembers(filters);
      
      // Fetch active departments for this committee
      const activeDepartments = await Department.find({ committee_id: committee._id, status: "Active", deletedAt: null }).sort({ displayOrder: 1 }).lean();

      if (members.length > 0) {
        // Serialize member ObjectIds
        const serializedMembers = members.map(m => {
          const s = { ...m };
          if (s._id) s._id = s._id.toString();
          if (s.district) s.district = { ...s.district, _id: s.district._id?.toString() };
          if (s.committee_id) s.committee_id = { ...s.committee_id, _id: s.committee_id._id?.toString() };
          if (s.department_id) s.department_id = { ...s.department_id, _id: s.department_id._id?.toString() };
          if (s.position_id) s.position_id = { ...s.position_id, _id: s.position_id._id?.toString() };
          return s;
        });

        results.push({
          ...committee,
          _id: committee._id.toString(),
          members: serializedMembers, // Provide all members in the main array
          departments: [] // Disable segregated department rendering in UI
        });
      }
    }
    
    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error("Error fetching committees with members:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
