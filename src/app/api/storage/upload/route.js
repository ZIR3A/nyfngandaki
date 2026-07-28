import { NextResponse } from "next/server";
import { parseUploadRequest } from "@/modules/storage/middleware/upload.middleware";
import { StorageService } from "@/modules/storage/services/storage.service";
import { auth } from "@/auth";

/**
 * POST /api/storage/upload
 * 
 * Accepts a multipart/form-data upload and stores the file via StorageService.
 * Checks Google Drive connection status before attempting upload — returns 503
 * with a clear message if Drive is not connected, so the UI can guide the admin.
 */
export async function POST(request) {
  try {
    // 1. JWT Authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please log in to upload files." },
        { status: 401 }
      );
    }

    // 2. Check Google Drive connection status BEFORE parsing (saves bandwidth if not connected)
    const service = new StorageService();
    const status = await service.getStatus();
    if (!status.isConnected) {
      return NextResponse.json(
        {
          success: false,
          message: "Google Drive is not connected. A Super Admin must connect it via Settings → Storage.",
          code: "DRIVE_NOT_CONNECTED",
        },
        { status: 503 }
      );
    }

    // 3. Parse and validate the multipart form data
    const parsedRequest = await parseUploadRequest(request);
    if (parsedRequest.errors) {
      return NextResponse.json(
        { success: false, message: "Validation failed.", errors: parsedRequest.errors },
        { status: 400 }
      );
    }

    // 4. Upload via Storage Service
    const result = await service.uploadFile({
      fileBuffer: parsedRequest.fileBuffer,
      originalName: parsedRequest.filename,
      mimeType: parsedRequest.mimeType,
      size: parsedRequest.size,
      module: parsedRequest.module,
      logicalFolder: parsedRequest.folder,
      entityId: parsedRequest.entityId,
      userId: session.user.id,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message, errors: result.errors },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "File uploaded successfully.", data: result.data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Storage Upload API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error.", errors: [error.message] },
      { status: 500 }
    );
  }
}
