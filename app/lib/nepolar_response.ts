import { ErrorDetails, ErrorResponse, SuccessResponse } from '#sharedTypes/server-response'

export class NepolarResponse {
  /**
   * Generates a success response.
   *
   * @param statusCode - HTTP status code for the response (e.g., 200, 201).
   * @param message - A success message describing the response.
   * @param data - The payload containing the response data.
   * @returns A success response object.
   *
   * @example
   * const response = NepoarResponse.success({
   *   statusCode: 200,
   *   message: "Data fetched successfully",
   *   data: { id: 1, name: "John Doe" }
   * });
   */
  static success<T>({
    statusCode,
    message,
    data,
  }: {
    statusCode: number
    message: string
    data: T
  }): SuccessResponse<T> {
    return {
      statusCode,
      message,
      error: null,
      data,
    }
  }

  /**
   * Generates an error response.
   *
   * @param statusCode - HTTP status code for the response (e.g., 400, 404, 500).
   * @param message - A general error message describing the issue.
   * @param errors - An array of detailed error objects.
   * @returns An error response object.
   *
   * @example
   * const response = NepoarResponse.failure({
   *   statusCode: 400,
   *   message: "Validation failed",
   *   errors: [
   *     { code: "REQUIRED_FIELD", message: "The email field is required", details: "email" },
   *     { code: "INVALID_FORMAT", message: "The phone number format is invalid", details: { field: "phone", expected: "E.164 format" } }
   *   ]
   * });
   */
  static error({
    statusCode,
    message,
    error,
  }: {
    statusCode: number
    message: string
    error: ErrorDetails[]
  }): ErrorResponse {
    return {
      statusCode,
      message,
      error,
      data: null,
    }
  }
}
