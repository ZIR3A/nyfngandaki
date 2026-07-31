import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Member from "@/models/Member";
import District from "@/models/District";

export async function GET() {
  try {
    await connectToDatabase();
    
    // Execute all queries concurrently for performance
    const [totalMembers, activeMembers, officeBearers, totalDistricts] = await Promise.all([
      Member.countDocuments(),
      Member.countDocuments({ status: "Active" }),
      Member.countDocuments({ status: "Active", isFeaturedOnHome: true }),
      District.countDocuments({ status: "Active" })
    ]);

    // Fallbacks if data is empty but we want to show something nice, 
    // though the DB will just return 0.
    return NextResponse.json({
      success: true,
      data: {
        totalMembers: totalMembers || 0,
        activeMembers: activeMembers || 0,
        officeBearers: officeBearers || 0,
        totalDistricts: totalDistricts || 0
      }
    });
  } catch (error) {
    console.error("Error fetching member statistics:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
