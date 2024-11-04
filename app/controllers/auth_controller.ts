import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {

  public async renderLoginPage({ inertia }: HttpContext) {
    return inertia.render('auth/login/index')
  }

  public async renderSignupPage({ inertia }: HttpContext) {
    return inertia.render('auth/signup/index')
  }
}
