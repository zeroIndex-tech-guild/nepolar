import User from '#models/user'
import { registrationValidator } from '#validators/auth/register'
import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  async show({ inertia }: HttpContext) {
    return inertia.render('auth/signup/index')
  }

  async create({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(registrationValidator)

    const { password, confirmPassword } = payload

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

    const { fullName, email } = payload

    try {
      const user = await User.create({
        fullName,
        email,
        password,
      })

      await auth.use('web').login(user)

      return response.status(201).send({
        success: true,
        message: 'User created successfully.',
        data: user,
        error: null,
      })
    } catch (error) {
      let message = 'Failed to create user.'
      if (error.constraint === 'users_email_unique') {
        message = 'User with this email already exists.'
      }

      return response.status(500).send({
        success: false,
        message,
        error: {
          message,
        },
        data: null,
      })
    }
  }
}
