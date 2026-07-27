import { errorResponse } from "./apiResponse";
import { ZodError } from "zod";

export function handleError(error) {
  console.error("API Error:", error);

  if (error instanceof ZodError) {
    const formattedErrors = error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    return errorResponse("Validation failed", formattedErrors, 400);
  }

  if (error.name === "MongoServerError" && error.code === 11000) {
    return errorResponse("Duplicate record found", [], 409);
  }

  if (error.name === "CastError") {
    return errorResponse("Invalid resource ID", [], 400);
  }

  if (error.statusCode) {
    return errorResponse(error.message, [], error.statusCode);
  }

  return errorResponse("Internal server error", [], 500);
}
