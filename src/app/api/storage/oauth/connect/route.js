import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { StorageService } from "@/modules/storage/services/storage.service";

/**
 * GET /api/storage/oauth/connect
 * 
 * Generates the Google OAuth authorization URL.
 * Super Admin only. Redirects the browser to Google's consent screen.
 */
export async function GET(request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }
    if (session.user.role !== "Super Admin") {
      return NextResponse.json(
        { success: false, message: "Only Super Admins can connect Google Drive." },
        { status: 403 }
      );
    }

    const service = new StorageService();
    const authUrl = service.generateOAuthUrl();

    // Redirect directly to Google
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error("OAuth Connect Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to generate OAuth URL." },
      { status: 500 }
    );
  }
}
