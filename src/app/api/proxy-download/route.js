import { NextResponse } from "next/server";

/**
 * GET /api/proxy-download?url=<encoded_url>&filename=<encoded_filename>
 *
 * Server-side proxy to fetch a remote file (e.g., Google Cloud Storage) and
 * stream it back to the browser as a forced download. This bypasses CORS
 * restrictions that mobile browsers enforce on direct cross-origin fetches.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get("url");
  const filename = searchParams.get("filename") || "document.pdf";

  if (!fileUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  try {
    const response = await fetch(decodeURIComponent(fileUrl), {
      headers: {
        // Pass a standard browser-like accept header
        Accept: "application/pdf,application/octet-stream,*/*",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch remote file: ${response.statusText}` },
        { status: response.status }
      );
    }

    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const arrayBuffer = await response.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${decodeURIComponent(filename)}"`,
        "Content-Length": arrayBuffer.byteLength.toString(),
        // Allow browser caching for 1 hour to avoid redundant downloads
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Proxy download error:", error);
    return NextResponse.json({ error: "Failed to proxy file download." }, { status: 500 });
  }
}
