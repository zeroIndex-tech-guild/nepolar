import Challenge from '#models/challenge'
import type { HttpContext } from '@adonisjs/core/http'
import { NepolarResponse } from '../../lib/nepolar-response.js'
import { updateChallengeValidator } from '#validators/challenge/update'
import { inject } from '@adonisjs/core'
import { ChallengeService } from '#services/challenge/index'
import { StatusCodes } from 'http-status-codes'
import Tag from '#models/tag'

@inject()
export default class ChallengesController {
  constructor(protected challengeService: ChallengeService) {}

  async renderEditPage({ inertia, params }: HttpContext) {
    const { challengeId } = params as { challengeId: string }
    const isEditPage = challengeId !== 'create'

    const { challenge, error } = await this.challengeService.findOne(challengeId)

    if (error !== null) {
      return inertia.render('challenges/create/index', {
        params,
      })
    }

    return inertia.render('challenges/create/index', {
      challenge,
      isEditPage,
      challengeId,
    })
  }

  async renderCreatePage({ inertia }: HttpContext) {
    return inertia.render('challenges/create/index', {
      challenge: null,
      isEditPage: false,
      challengeId: 'new',
    })
  }

  async renderDetailPage({ inertia, params }: HttpContext) {
    const { challengeId } = params as { challengeId: string }
    const { challenge, error } = await this.challengeService.findOne(challengeId)

    if (error !== null) {
      console.log({ error })
      return inertia.render('challenges/create/index', {
        params,
      })
    }
    return inertia.render('challenges/detail/index', {
      challenge,
      challengeId,
    })
  }

  async read({ request, response }: HttpContext) {
    const challengeId = request.param('challengeId')

    try {
      const challenge = await Challenge.query()
        .where('id', challengeId)
        .preload('tags')
        .firstOrFail()

      const message = `Challenge found: ${challenge.name}`
      console.log(challenge, 'challenge is here')
      const successResponse = NepolarResponse.success({
        statusCode: StatusCodes.OK,
        data: { challenge },
        message,
      })

      return response.status(StatusCodes.OK).json(successResponse)
    } catch (error) {
      const message = `Challenge not found: ${challengeId}`
      const errorResponse = {
        statusCode: StatusCodes.NOT_FOUND,
        message,
        error: error,
      }

      return response.status(StatusCodes.NOT_FOUND).json(errorResponse)
    }
  }

  async update({ request, response }: HttpContext) {
    const challengeId = request.param('challengeId')
    const payload = await request.validateUsing(updateChallengeValidator)

    try {
      const challenge = await Challenge.findOrFail(challengeId)
      challenge.merge(payload)
      await challenge.save()

      if (payload.tags) {
        const tagInstances = await Promise.all(
          payload.tags.map(async (tagName: string) => {
            return await Tag.firstOrCreate({ name: tagName })
          })
        )

        await challenge.related('tags').sync(tagInstances.map((tag) => tag.id))
      }
      await challenge.load('tags')

      const message = `Challenge updated: ${challenge.name}`
      const successResponse = NepolarResponse.success({
        statusCode: StatusCodes.OK,
        data: { challenge },
        message,
      })
      return response.status(StatusCodes.OK).json(successResponse)
    } catch (error) {
      const errorResponse = NepolarResponse.error({
        statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
        message: "Couldn't update challenge at the moment.",
        error: error,
      })

      return response.status(StatusCodes.UNPROCESSABLE_ENTITY).json(errorResponse)
    }
  }

  async delete({ request, response }: HttpContext) {
    const challengeId = request.param('challengeId')

    try {
      const challenge = await Challenge.findOrFail(challengeId)
      await challenge.delete()
      const message = `Challenge deleted: ${challenge.name}`
      const successResponse = NepolarResponse.success({
        statusCode: StatusCodes.OK,
        data: { challenge },
        message,
      })

      return response.status(StatusCodes.OK).json(successResponse)
    } catch (error) {
      const errorResponse = NepolarResponse.error({
        statusCode: StatusCodes.NOT_MODIFIED,
        message: "Couldn't delete challenge at the moment.",
        error: error,
      })
      return response.status(StatusCodes.NOT_MODIFIED).json(errorResponse)
    }
  }
}
