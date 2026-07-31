import { NextResponse } from "next/server";
import { DistrictService } from "@/services/DistrictService";
import Member from "@/models/Member";
import { DatabaseService } from "@/services/DatabaseService";

export async function GET(request, { params }) {
  try {
    const slug = (await params).slug;
    
    if (!slug || slug === "all") {
      return NextResponse.json({ success: false, message: "Invalid district slug" }, { status: 400 });
    }

    await DatabaseService.connect();
    
    const district = await DistrictService.getBySlug(slug);
    if (!district) {
      return NextResponse.json({ success: false, message: "District not found" }, { status: 404 });
    }

    // Fetch stats
    const totalMembers = await Member.countDocuments({ district: district._id, status: "Active" });
    const officeBearers = await Member.countDocuments({ district: district._id, status: "Active", isFeaturedOnHome: true });

    // Clean up IDs for client
    const serialized = {
      ...district,
      _id: district._id.toString(),
      stats: {
        totalMembers,
        officeBearers,
      }
    };

    return NextResponse.json({ success: true, data: serialized });
  } catch (error) {
    console.error("Failed to load district details", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
