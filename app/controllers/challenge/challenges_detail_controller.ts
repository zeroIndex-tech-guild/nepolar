import type { HttpContext } from '@adonisjs/core/http'

export default class ChallengesController {
  async show({ inertia, params }: HttpContext) {
    return inertia.render('challenges/create/index', {
      params,
    })
  }

  async read({}: HttpContext) {}

  async update({}: HttpContext) {}

  async delete({}: HttpContext) {}
}
