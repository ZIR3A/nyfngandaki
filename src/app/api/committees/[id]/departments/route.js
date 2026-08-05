import { NextResponse } from "next/server";
import { DepartmentService } from "@/services/DepartmentService";

export async function GET(req, { params }) {
  try {
    const { id: committeeId } = params;
    const departments = await DepartmentService.getDepartmentsByCommittee(committeeId, { status: "Active" });

    return NextResponse.json({
      success: true,
      data: departments,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
