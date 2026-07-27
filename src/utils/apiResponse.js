import { NextResponse } from "next/server";

export function successResponse(data = {}, message = "Success", status = 200) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

export function errorResponse(message = "An error occurred", errors = [], status = 500) {
  return NextResponse.json(
    {
      success: false,
      message,
      errors,
    },
    { status }
  );
}
