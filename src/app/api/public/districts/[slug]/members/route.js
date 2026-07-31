import { NextResponse } from "next/server";
import { DistrictService } from "@/services/DistrictService";
import { MemberService } from "@/services/MemberService";

export async function GET(request, { params }) {
  try {
    const slug = params.slug;
    if (!slug) {
      return NextResponse.json({ success: false, message: "District slug is required." }, { status: 400 });
    }

    const district = await DistrictService.getBySlug(slug);
    if (!district) {
      return NextResponse.json({ success: false, message: "District not found." }, { status: 404 });
    }

    const members = await MemberService.getAllMembers({ district: district._id, status: "Active" });

    return NextResponse.json({
      success: true,
      data: members,
      district: district,
    });
  } catch (error) {
    console.error("Error fetching district members:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch members." },
      { status: 500 }
    );
  }
}
