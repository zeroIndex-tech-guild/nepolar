import LobbyService from '#services/lobby/index'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class LobbyController {
  constructor(protected lobbyService: LobbyService) {}

  async index({ inertia }: HttpContext) {
    const { data } = await this.lobbyService.getFeed()

    const props = data!
    return inertia.render('lobby/index', props)
  }

  async renderChallengesPage({ inertia }: HttpContext) {
    const { data } = await this.lobbyService.getFeed()
    const props = data!
    return inertia.render('lobby-challenges/index', props)
  }
}
