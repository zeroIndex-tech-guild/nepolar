import Challenge from '#models/challenge'
import type { HttpContext } from '@adonisjs/core/http'
import { NepoarResponse } from '../../lib/nepolar-response.js'

export default class ChallengesController {
  async show({ inertia, params }: HttpContext) {
    return inertia.render('challenges/create/index', {
      params,
    })
  }

  async read({ request }: HttpContext) {
    const challengeId = request.param('challengeId')

    try {
      const challenge = await Challenge.findOrFail(challengeId)
      const message = `Challenge found: ${challenge.name}`
      return NepoarResponse.success(challenge, message)
    } catch (error) {
      const message = `Challenge not found: ${challengeId}`
      return NepoarResponse.failure(error, message)
    }
  }

  async update({}: HttpContext) {}

  async delete({}: HttpContext) {}
}
