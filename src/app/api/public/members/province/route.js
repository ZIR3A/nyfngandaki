import { NextResponse } from "next/server";
import { MemberService } from "@/services/MemberService";

export async function GET(request) {
  try {
    const members = await MemberService.getAllMembers({ organizationLevel: "PROVINCE", status: "Active" });
    return NextResponse.json({ success: true, data: members });
  } catch (error) {
    console.error("Error fetching province members:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
