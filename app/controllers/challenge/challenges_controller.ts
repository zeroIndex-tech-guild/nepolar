import Challenge from '#models/challenge'
import { createChallengeValidator } from '#validators/challenge/create'
import type { HttpContext } from '@adonisjs/core/http'

export default class ChallengesController {
  async show({}: HttpContext) {}

  async create({ request, response, auth }: HttpContext) {
    if (!auth.isAuthenticated) {
      return response.status(401).send({
        success: false,
        message: 'Please login to create a new challenge.',
        error: {
          message: 'Please login to create a new challenge.',
        },
        data: null,
      })
    }

    try {
      const payload = await request.validateUsing(createChallengeValidator)

      const { days, name, tags } = payload

      const challenge = await Challenge.create({
        days,
        name,
      })

      return {
        days,
        name,
        tags,
        challenge,
      }
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
        response.status(error.staus).json({
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

  async read({}: HttpContext) {}

  async update({}: HttpContext) {}

  async delete({}: HttpContext) {}

  async findAll({}: HttpContext) {}

  async findOne({}: HttpContext) {}
}
