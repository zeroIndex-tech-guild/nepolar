export class NepoarResponse {
  static success(data: unknown, message: string) {
    return {
      success: true,
      message,
      error: null,
      data,
    }
  }

  static failure(error: unknown, message: string) {
    return {
      success: false,
      message,
      error,
      data: null,
    }
  }
}
