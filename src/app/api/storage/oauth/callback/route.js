import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { StorageService } from "@/modules/storage/services/storage.service";

/**
 * GET /api/storage/oauth/callback
 * 
 * Receives the authorization code from Google after the user grants permission.
 * Exchanges the code for OAuth tokens and saves them encrypted to MongoDB.
 * Redirects to the Storage Settings page on success.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  const settingsUrl = new URL("/admin/settings/storage", request.url);

  // Handle user denying permission
  if (error) {
    settingsUrl.searchParams.set("error", "access_denied");
    return NextResponse.redirect(settingsUrl.toString());
  }

  if (!code) {
    settingsUrl.searchParams.set("error", "no_code");
    return NextResponse.redirect(settingsUrl.toString());
  }

  try {
    // The session is not required at callback time since Google redirects here
    // But we still want to record who connected — use the last known session
    const session = await auth();
    const userId = session?.user?.id || null;

    const service = new StorageService();
    const result = await service.connectOAuth(code, userId);

    settingsUrl.searchParams.set("connected", "true");
    settingsUrl.searchParams.set("email", result.connectedEmail || "");
    return NextResponse.redirect(settingsUrl.toString());
  } catch (err) {
    console.error("OAuth Callback Error:", err);
    settingsUrl.searchParams.set("error", encodeURIComponent(err.message));
    return NextResponse.redirect(settingsUrl.toString());
  }
}
