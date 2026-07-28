import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { StorageService } from "@/modules/storage/services/storage.service";

/**
 * POST /api/storage/oauth/test
 * 
 * Tests the Google Drive connection by uploading and immediately deleting a small file.
 * Super Admin only.
 */
export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }
    if (session.user.role !== "Super Admin") {
      return NextResponse.json(
        { success: false, message: "Only Super Admins can run connection tests." },
        { status: 403 }
      );
    }

    const service = new StorageService();
    const result = await service.testConnection();

    return NextResponse.json({ success: true, message: result.message }, { status: 200 });
  } catch (error) {
    console.error("OAuth Test Connection Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Connection test failed." },
      { status: 500 }
    );
  }
}
