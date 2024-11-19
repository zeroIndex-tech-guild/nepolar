import Challenge from '#models/challenge'
import type { HttpContext } from '@adonisjs/core/http'
import { NepoarResponse } from '../../lib/nepolar-response.js'
import { updateChallengeValidator } from '#validators/challenge/update'
import { inject } from '@adonisjs/core'
import { ChallengeService } from '#services/challenge/index'
import { StatusCodes } from 'http-status-codes'

@inject()
export default class ChallengesController {
  constructor(protected challengeService: ChallengeService) {}

  async edit({ inertia, params }: HttpContext) {
    const { challengeId } = params as { challengeId: string }
    const isEditPage = challengeId !== 'create'

    const { challenge, error } = await this.challengeService.findOne(challengeId)

    if (error !== null) {
      console.log({ error })
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

  async new({ inertia }: HttpContext) {
    return inertia.render('challenges/create/index', {
      challenge: null,
      isEditPage: false,
      challengeId: 'new',
    })
  }

  async detail({ inertia, params }: HttpContext) {
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

  async update({ request }: HttpContext) {
    const challengeId = request.param('challengeId')
    const payload = await request.validateUsing(updateChallengeValidator)

    try {
      const challenge = await Challenge.findOrFail(challengeId)
      challenge.merge(payload)
      console.log({ challenge }, '********')
      await challenge.save()

      const message = `Challenge updated: ${challenge.name}`
      return NepoarResponse.success(challenge, message)
    } catch (error) {
      console.log({ error })
      return NepoarResponse.failure(error, "Challenge couldn't be updated.")
    }
  }

  async delete({ request, response }: HttpContext) {
    const challengeId = request.param('challengeId')

    try {
      const challenge = await Challenge.findOrFail(challengeId)
      await challenge.delete()
      const message = `Challenge deleted: ${challenge.name}`
      return NepoarResponse.success(challenge, message)
    } catch (error) {
      return response
        .status(StatusCodes.NOT_MODIFIED)
        .json(NepoarResponse.failure(error, "Challenge couldn't be deleted."))
    }
  }
}
