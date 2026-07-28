import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { StorageService } from "@/modules/storage/services/storage.service";
import connectToDatabase from "@/lib/mongodb";
import StorageModel from "@/modules/storage/models/storage.model";

/**
 * GET /api/storage/[id]
 * Returns a single storage asset's metadata.
 * 
 * DELETE /api/storage/[id]
 * Permanently deletes the file from Google Drive and removes metadata from MongoDB.
 */

export async function GET(request, { params }) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();
    const asset = await StorageModel.findById(id).lean();

    if (!asset || asset.deletedAt) {
      return NextResponse.json({ success: false, message: "Asset not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: asset }, { status: 200 });
  } catch (error) {
    console.error("Storage GET Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    const service = new StorageService();
    const result = await service.deleteFile(id);

    if (!result.success) {
      return NextResponse.json({ success: false, message: result.message }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: result.message }, { status: 200 });
  } catch (error) {
    console.error("Storage DELETE Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error." }, { status: 500 });
  }
}
