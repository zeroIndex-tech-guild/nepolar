import User from '#models/user'
import { loginValidator } from '#validators/auth/login'
import { type HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  async show({ inertia, auth }: HttpContext) {
    const { isAuthenticated } = auth
    try {
      await auth.authenticate()
      const user = auth.user

      const props = {
        user,
        isAuthenticated,
      }

      return inertia.render('auth/login/index', props)
    } catch (error) {
      return inertia.render('auth/login/index')
    }
  }

  async login({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(loginValidator)

    const { email, password } = payload

    try {
      const user = await User.verifyCredentials(email, password)

      await auth.use('web').login(user)

      return response.status(200).send({
        success: true,
        message: 'Login successful',
        error: null,
        data: { user },
      })
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
