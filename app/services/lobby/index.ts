import Log from '#models/log'
import { ChallengeService } from '#services/challenge/index'
import { inject } from '@adonisjs/core'

@inject()
export default class LobbyService {
  constructor(protected challengeService: ChallengeService) {}

  async getFeed() {
    try {
      const { data: challenges } = await this.challengeService.findChallengesForLobby({
        page: 1,
        limit: 25,
        orderBy: 'desc',
      })
      const logs = await Log.query().orderBy('created_at', 'desc').limit(25)

      return {
        data: {
          challenges,
          logs,
        },
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error,
      }
    }
  }

  async getChallenges() {
    //const {} = await this.challengeService
  }
}
