import User from '#models/user'
import { loginValidator } from '#validators/auth/login'
import { type HttpContext } from '@adonisjs/core/http'
import { NepolarResponse } from '#lib/nepolar_response'
import { StatusCodes } from 'http-status-codes'

export default class LoginController {
  async renderLoginPage({ inertia, auth, response }: HttpContext) {
    const { isAuthenticated } = auth

    if (isAuthenticated) {
      return response.redirect().toRoute('/dashboard')
    }

    return inertia.render('auth/login/index')
  }

  async login({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(loginValidator)

    const { email, password } = payload

    try {
      const user = await User.verifyCredentials(email, password)

      await auth.use('web').login(user)

      const successResponse = NepolarResponse.success({
        statusCode: StatusCodes.OK,
        message: 'User logged in successfully...',
        data: { user },
      })

      return response.status(StatusCodes.OK).send(successResponse)
    } catch (error) {
      const errorResponse = NepolarResponse.error({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: 'Invalid email or password...',
        error: [
          {
            message: 'Invalid email or password',
            code: 'INVALID_CREDENTIALS',
            details: error,
          },
        ],
      })
      return response.status(StatusCodes.UNAUTHORIZED).send(errorResponse)
    }
  }
}
