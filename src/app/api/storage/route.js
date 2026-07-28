import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { StorageService } from "@/modules/storage/services/storage.service";

/**
 * GET /api/storage
 * 
 * Returns a paginated list of storage assets for the Media Library.
 * Supports filtering by module, search query, and MIME category.
 */
export async function GET(request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "24", 10);
    const module = searchParams.get("module") || "all";
    const search = searchParams.get("search") || "";
    const mimeCategory = searchParams.get("mimeCategory") || "";

    const service = new StorageService();
    const result = await service.listFiles({ page, limit, module, search, mimeCategory });

    if (!result.success) {
      return NextResponse.json({ success: false, message: result.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: result.data }, { status: 200 });
  } catch (error) {
    console.error("Storage List API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error.", errors: [error.message] },
      { status: 500 }
    );
  }
}
