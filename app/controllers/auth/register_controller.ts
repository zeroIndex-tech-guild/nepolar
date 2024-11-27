import { E_VALIDATION_ERROR } from '#errorCode'
import { NepolarResponse } from '#lib/nepolar-response'
import User from '#models/user'
import { registrationValidator } from '#validators/auth/register'
import type { HttpContext } from '@adonisjs/core/http'
import { StatusCodes } from 'http-status-codes'

export default class RegisterController {
  async renderSignupPage({ inertia, auth, response }: HttpContext) {
    const { isAuthenticated } = auth

    if (isAuthenticated) {
      return response.redirect().toRoute('/dashboard')
    }

    return inertia.render('auth/signup/index')
  }

  async register({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(registrationValidator)

      const { password, confirmPassword, ...rest } = payload

      if (password !== confirmPassword) {
        return response.status(400).send({
          success: false,
          message: 'Passwords do not match.',
          error: {
            message: 'Passwords do not match.',
          },
          data: null,
        })
      }

      const user = await User.create({
        ...rest,
        password,
      })

      await auth.use('web').login(user)

      const successResponse = NepolarResponse.success({
        message: 'User created successfully.',
        data: {
          user,
        },
        statusCode: StatusCodes.CREATED,
      })
      return response.status(201).send(successResponse)
    } catch (error) {
      let message = error.message
      if (error.constraint === 'users_email_unique') {
        message = 'User with this email already exists.'
      }

      if (error.constraint === 'users_user_name_unique') {
        message = 'User with this username already exists.'
      }

      if (error.code === E_VALIDATION_ERROR) {
        const errorResponse = NepolarResponse.error({
          statusCode: StatusCodes.BAD_REQUEST,
          message,
          error: [
            {
              message,
              code: error.code,
              details: error.messages,
            },
          ],
        })
        return response.status(error.status).json(errorResponse)
      }

      const errorResponse = NepolarResponse.error({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Failed to create user.',
        error: [
          {
            message,
            code: error.code,
            details: error.messages,
          },
        ],
      })
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorResponse)
    }
  }
}
