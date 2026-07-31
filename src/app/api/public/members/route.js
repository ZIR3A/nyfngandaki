import { NextResponse } from "next/server";
import { MemberService } from "@/services/MemberService";
import District from "@/models/District";
import connectToDatabase from "@/lib/mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const districtSlug = searchParams.get("district");
    const position = searchParams.get("position");
    const committee = searchParams.get("committee");
    const status = searchParams.get("status");

    const level = searchParams.get("level");
    const districtId = searchParams.get("district_id");

    let filters = {};

    if (level && level !== "all") {
      filters.organizationLevel = level.toUpperCase();
    }

    if (status && status !== "all") {
      filters.status = status.charAt(0).toUpperCase() + status.slice(1);
    }

    // Note: To filter by committee or position now, we should ideally pass their IDs.
    if (committee && committee !== "all") {
      filters.committee_id = committee;
    }

    if (position && position !== "all") {
      filters.position_id = position;
    }

    await connectToDatabase();

    if (districtId) {
      filters.district = districtId;
    } else if (districtSlug && districtSlug !== "all") {
      const d = await District.findOne({ slug: districtSlug }).lean();
      if (d) {
        filters.district = d._id;
      } else {
        // District not found, return empty
        return NextResponse.json({ success: true, data: [] });
      }
    }

    const members = await MemberService.getAllMembers(filters);
    
    return NextResponse.json({ success: true, data: members });
  } catch (error) {
    console.error("Error in members API:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
