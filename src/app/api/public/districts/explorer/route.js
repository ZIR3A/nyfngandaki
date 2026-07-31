import { NextResponse } from "next/server";
import { DistrictService } from "@/services/DistrictService";
import Member from "@/models/Member";
import { DatabaseService } from "@/services/DatabaseService";

export async function GET() {
  try {
    await DatabaseService.connect();
    const districts = await DistrictService.getAll();
    
    // For each district, compute member counts and office bearers
    const districtsWithStats = await Promise.all(
      districts.map(async (d) => {
        const memberCount = await Member.countDocuments({ district: d._id, status: "Active" });
        const officeBearers = await Member.countDocuments({ district: d._id, status: "Active", isFeaturedOnHome: true });
        
        // Serialize object IDs
        return {
          ...d,
          _id: d._id.toString(),
          stats: {
            totalMembers: memberCount,
            officeBearers: officeBearers
          }
        };
      })
    );

    return NextResponse.json({ success: true, data: districtsWithStats });
  } catch (error) {
    console.error("Failed to load district explorer data", error);
    return NextResponse.json({ success: false, message: "Failed to load districts" }, { status: 500 });
  }
}
