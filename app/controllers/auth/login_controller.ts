import User from '#models/user'
import { loginValidator } from '#validators/auth/login'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  async show({ inertia }: HttpContext) {
    return inertia.render('auth/login/index')
  }

  async create({ request, response, auth, inertia }: HttpContext) {
    const payload = await request.validateUsing(loginValidator)

    const { email, password } = payload

    try {
      const user = await User.verifyCredentials(email, password)

      await auth.use('web').login(user)

      return response.redirect().toRoute('home')
    } catch (error) {
      return response.status(401).send({
        success: false,
        message: 'Invalid email or password',
        error: {
          message: 'Invalid email or password',
        },
        data: null,
      })
    }
  }
}
