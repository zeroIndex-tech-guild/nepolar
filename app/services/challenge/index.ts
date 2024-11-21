import Challenge from '#models/challenge'
import { CreateChallenge } from '#types/challenge'

export class ChallengeService {
  async create(challenge: CreateChallenge, userId: number) {
    try {
      const { tags, ...rest } = challenge
      const newChallenge = await Challenge.create({
        ...rest,
        userId,
      })

      const mappedTags = tags.map((tag) => ({ name: tag }))

      newChallenge.related('tags').createMany(mappedTags)

      //newChallenge.related('tags').load()
      return {
        challenge: newChallenge,
        error: null,
      }
    } catch (error) {
      return {
        challenge: null,
        error,
      }
    }
  }

  async findAll({
    userId,
    page = 1,
    limit = 25,
    orderBy = 'desc',
  }: {
    userId: number
    page?: number
    limit?: number
    orderBy?: 'desc' | 'asc'
  }) {
    try {
      const challenges = await Challenge.query()
        .where('user_id', userId)
        .orderBy('created_at', orderBy)
        .paginate(page, limit)

      return {
        challenges,
        error: null,
      }
    } catch (error) {
      return {
        challenges: null,
        error,
      }
    }
  }

  async findOne(challengeId: string) {
    try {
      const challenge = await Challenge.query()
        .preload('logs')
        .preload('tags')
        .where('id', challengeId)
        .first()
      return {
        challenge,
        error: null,
      }
    } catch (error) {
      return {
        challenge: null,
        error,
      }
    }
  }
}
