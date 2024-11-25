/**
 * Represents the details of a single error.
 *
 * @example
 * // Validation Error Example
 * {
 *   code: "REQUIRED_FIELD",
 *   message: "The email field is required",
 *   details: "email"
 * }
 *
 * @example
 * // Error with additional context
 * {
 *   code: "INVALID_FORMAT",
 *   message: "The phone number is invalid",
 *   details: { field: "phone", expected: "E.164 format" }
 * }
 */
export type ErrorDetails = {
  code: string // A unique error code for easier debugging (e.g., "VALIDATION_ERROR", "USER_NOT_FOUND").
  message: string // A user-friendly error message (e.g., "The email format is invalid").
  details?: string | Record<string, any> // Optional additional context or data.
}

/**
 * Represents an error response from the server.
 *
 * @example
 * // Validation Error Response Example
 * {
 *   message: "Validation failed",
 *   data: null,
 *   errors: [
 *     { code: "REQUIRED_FIELD", message: "The email field is required", details: "email" },
 *     { code: "INVALID_FORMAT", message: "The phone number is invalid", details: { field: "phone", expected: "E.164 format" } }
 *   ]
 * }
 *
 * @example
 * // Authentication Error Response Example
 * {
 *   message: "Authentication failed",
 *   data: null,
 *   errors: [{ code: "UNAUTHORIZED", message: "Invalid username or password" }]
 * }
 */
export type ErrorResponse = {
  message: string // General error message for logging/debugging.
  data: null // Always null for error responses.
  errors: ErrorDetails[] // Array of detailed error objects.
}

/**
 * Represents a successful response from the server.
 *
 * @example
 * // Success Response Example
 * {
 *   message: "User fetched successfully",
 *   data: { id: 1, name: "John Doe" },
 *   error: null
 * }
 */
export type SuccessResponse<T> = {
  message: string // A success message.
  data: T // The payload returned by the server.
  error: null // Always null for success responses.
}

/**
 * Represents the unified structure for server responses, combining both success and error cases.
 *
 * @example
 * // Success Response
 * {
 *   message: "User fetched successfully",
 *   data: { id: 1, name: "Jane Doe" },
 *   error: null
 * }
 *
 * @example
 * // Error Response
 * {
 *   message: "User not found",
 *   data: null,
 *   errors: [{ code: "USER_NOT_FOUND", message: "The user with ID 42 does not exist." }]
 * }
 */
export type ServerResponse<T> = SuccessResponse<T> | ErrorResponse
