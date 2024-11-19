import Challenge from '#models/challenge'
import { createChallengeValidator } from '#validators/challenge/create'
import type { HttpContext } from '@adonisjs/core/http'
import { StatusCodes } from 'http-status-codes'

export default class ChallengesController {
  async show({ inertia }: HttpContext) {
    return inertia.render('challenges/index')
  }

  async create({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(createChallengeValidator)

      const { days, name, tags, description } = payload

      const user = auth.user

      const challenge = await Challenge.create({
        days,
        name,
        description,
        userId: user?.id,
      })

      return response.safeStatus(StatusCodes.CREATED).json({
        days,
        name,
        tags,
        challenge,
      })
    } catch (error) {
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
  }

  async findAll({ auth }: HttpContext) {
    const user = auth.user

    if (!user) {
      return {
        success: false,
        message: "Couldn't fetch challenges at the moment.",
        error: {
          message: "Couldn't fetch challenges at the moment.",
        },
        data: null,
      }
    }

    try {
      const challenges = await Challenge.findManyBy({ user_id: user?.id })
      return {
        success: true,
        message: 'Challenges fetched successfully.',
        error: null,
        data: challenges,
      }
    } catch (error) {
      return {
        success: false,
        message: "Couldn't fetch challenges at the moment.",
        error: {
          error,
        },
        data: null,
      }
    }
  }
}
