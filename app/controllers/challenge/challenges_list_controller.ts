import { ChallengeService } from '#services/challenge/index'
import { createChallengeValidator } from '#validators/challenge/create'
import { findChallengesForCurrentUser } from '#validators/challenge/getAll'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { StatusCodes } from 'http-status-codes'
import { NepolarResponse } from '#lib/nepolar-response'

@inject()
export default class ChallengesController {
  constructor(protected challengeService: ChallengeService) {}

  async renderChallengesPage({ inertia, auth, request }: HttpContext) {
    const user = auth.user!

    const { page = 1, limit = 25, orderBy = 'desc' } = request.qs()

    const { challenges } = await this.challengeService.findChallengesForCurrentUser({
      userId: user?.id,
      page,
      limit,
      orderBy,
    })

    return inertia.render('challenges/index', {
      challenges,
    })
  }

  async renderCreatePage({ inertia }: HttpContext) {
    return inertia.render('challenges/create/index', {
      challenge: null,
      isEditPage: false,
      challengeId: 'new',
    })
  }

  async createNewChallenge({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(createChallengeValidator)

    const { days, name, tags, description } = payload

    const user = auth.user!

    const { challenge, error } = await this.challengeService.create(
      {
        days,
        name,
        tags,
        description,
      },
      user?.id
    )

    if (error !== null) {
      let error_response = NepolarResponse.error({
        statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
        message: "Couldn't create a new challenge at the moment.",
        error: [
          {
            details: error.messages,
            message: 'Please provide valid and required data.',
            code: 'E_VALIDATION_ERROR',
          },
        ],
      })

      if (error.code === 'E_VALIDATION_ERROR') {
        error_response = NepolarResponse.error({
          statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
          message: "Couldn't create a new challenge at the moment.",
          error: error.messages,
        })
      }

      return response.status(500).json(error_response)
    }

    const successResponse = NepolarResponse.success({
      statusCode: StatusCodes.CREATED,
      message: 'Challenge created successfully.',
      data: {
        challenge,
      },
    })
    return response.status(StatusCodes.CREATED).json(successResponse)
  }

  async findChallengesForCurrentUser({ auth, request, response }: HttpContext) {
    const user = auth.user!
    const { page, limit, orderBy } = await request.validateUsing(findChallengesForCurrentUser)

    const { challenges, error } = await this.challengeService.findChallengesForCurrentUser({
      userId: user?.id,
      page,
      limit,
      orderBy,
    })

    if (error !== null) {
      const errorResponse = NepolarResponse.error({
        statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
        message: 'Challenges could not be fetched at the moment.',
        error: error,
      })
      response.status(error.status).json(errorResponse)
    }

    const successResponse = NepolarResponse.success({
      statusCode: StatusCodes.OK,
      message: 'Challenges fetched successfully.',
      data: {
        challenges,
      },
    })

    return response.safeStatus(StatusCodes.OK).json(successResponse)
  }
}
