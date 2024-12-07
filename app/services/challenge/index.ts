import Challenge from '#models/challenge'
import Tag from '#models/tag'
import { CreateChallenge } from '#types/challenge'

export class ChallengeService {
  async create(challenge: CreateChallenge, userId: number) {
    try {
      const { tags, ...rest } = challenge
      const newChallenge = await Challenge.create({
        ...rest,
        userId,
      })

      const tagInstances = await Promise.all(
        tags.map(async (tagName) => {
          return await Tag.firstOrCreate({ name: tagName })
        })
      )

      await newChallenge.related('tags').attach(tagInstances.map((tag) => tag.id))

      await newChallenge.load('tags')

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

  async findChallengesForCurrentUser({
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

      console.log({ challenges }, '****')
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

  async findOne(challengeId: string | number) {
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

  async findChallengesForLobby({
    page = 1,
    limit = 25,
    orderBy = 'desc',
  }: {
    page?: number
    limit?: number
    orderBy?: 'desc' | 'asc'
  }) {
    try {
      const data = await Challenge.query().orderBy('created_at', orderBy).paginate(page, limit)

      return {
        data,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error,
      }
    }
  }

  async findChallengesForUser(userId: number) {
    try {
      const data = await Challenge.query().where('user_id', userId)
      return {
        data,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error,
      }
    }
  }

  async findChallenges({
    page = 1,
    limit = 25,
    orderBy = 'desc',
  }: {
    page?: number
    limit?: number
    orderBy?: 'desc' | 'asc'
  }) {
    try {
      const data = await Challenge.query().orderBy('created_at', orderBy).paginate(page, limit)

      return {
        data,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error,
      }
    }
  }
}
