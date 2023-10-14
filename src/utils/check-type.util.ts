import { AuthErrorResponse } from "@/types/response.type";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function isAuthErrorResponse(
  error: unknown
): error is AuthErrorResponse {
  return (
    typeof error === "object" &&
    error !== null &&
    "error" in error &&
    "message" in error
  );
}
