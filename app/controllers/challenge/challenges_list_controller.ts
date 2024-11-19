import { ChallengeService } from '#services/challenge/index'
import { createChallengeValidator } from '#validators/challenge/create'
import { getAllChallengeValidator } from '#validators/challenge/getAll'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { StatusCodes } from 'http-status-codes'
import { NepoarResponse } from '../../lib/nepolar-response.js'

@inject()
export default class ChallengesController {
  constructor(protected challengeService: ChallengeService) {}

  async show({ inertia, auth, request }: HttpContext) {
    const user = auth.user!

    const { page = 1, limit = 25, orderBy = 'desc' } = request.qs()

    const { challenges, error } = await this.challengeService.findAll({
      userId: user?.id,
      page,
      limit,
      orderBy,
    })

    return inertia.render('challenges/index', {
      challenges,
    })
  }

  async create({ request, response, auth }: HttpContext) {
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
      let error_response = {
        success: false,
        message: "Couldn't create a new challenge at the moment.",
        error: {
          error,
          details: error.messages,
        },
        data: null,
      }

      if (error.code === 'E_VALIDATION_ERROR') {
        response.status(error.status).json({
          success: false,
          message: 'Please provide valid and required data.',
          error: {
            details: error.messages,
          },
          data: null,
        })
      }

      return response.status(500).json(error_response)
    }

    return response.safeStatus(StatusCodes.CREATED).json({
      days,
      name,
      tags,
      challenge,
    })
  }

  async findAll({ auth, request, response }: HttpContext) {
    const user = auth.user!
    const { page, limit, orderBy } = await request.validateUsing(getAllChallengeValidator)

    const { challenges, error } = await this.challengeService.findAll({
      userId: user?.id,
      page,
      limit,
      orderBy,
    })

    if (error !== null) {
      response
        .status(error.status)
        .json(NepoarResponse.failure(error, 'Challenges could not be fetched at the moment.'))
    }

    return response
      .safeStatus(StatusCodes.OK)
      .json(NepoarResponse.success(challenges, 'Challenges fetched successfully.'))
  }
}
