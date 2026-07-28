import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { StorageService } from "@/modules/storage/services/storage.service";

/**
 * GET /api/storage/oauth/status
 * 
 * Returns the current Google Drive connection status.
 * Authenticated CRM users can view status; token values are never exposed.
 */
export async function GET(request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    const service = new StorageService();
    const status = await service.getStatus();

    return NextResponse.json({ success: true, data: status }, { status: 200 });
  } catch (error) {
    console.error("OAuth Status Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to get storage status." },
      { status: 500 }
    );
  }
}
