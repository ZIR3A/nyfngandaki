import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { StorageService } from "@/modules/storage/services/storage.service";

/**
 * POST /api/storage/oauth/disconnect
 * 
 * Disconnects the Google Drive integration by clearing all tokens from the DB.
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
        { success: false, message: "Only Super Admins can disconnect Google Drive." },
        { status: 403 }
      );
    }

    const service = new StorageService();
    await service.disconnectOAuth();

    return NextResponse.json(
      { success: true, message: "Google Drive disconnected successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("OAuth Disconnect Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to disconnect." },
      { status: 500 }
    );
  }
}
