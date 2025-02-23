import type { HttpContext } from '@adonisjs/core/http'
import { NepolarResponse } from '../../lib/nepolar_response.js'
import { StatusCodes } from 'http-status-codes'

export default class LogoutController {
  async logout({ auth }: HttpContext) {
    await auth.use('web').logout()

    const successResponse = NepolarResponse.success({
      statusCode: StatusCodes.OK,
      message: 'User logged out successfully',
      data: null,
    })
    return successResponse
  }
}
