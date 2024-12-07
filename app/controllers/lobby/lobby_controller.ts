import LobbyService from '#services/lobby/index'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class LobbyController {
  constructor(protected lobbyService: LobbyService) {}

  async index({ inertia }: HttpContext) {
    const { data } = await this.lobbyService.getFeed()

    const props = data!
    console.log({ props })
    return inertia.render('lobby/index', props)
  }

  async renderChallengesPage({ inertia, request }: HttpContext) {
    const { page = 1, limit = 25, orderBy = 'desc' } = request.qs()
    const { data } = await this.lobbyService.getChallenges({
      page,
      limit,
      orderBy,
    })
    const props = {
      challenges: data,
    }!

    console.log({ props }, '**** from render challenges page:w')
    return inertia.render('lobby-challenges/index', props)
  }
}
