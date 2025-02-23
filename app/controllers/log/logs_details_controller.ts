import { LogService } from '#services/log/index'
import type { HttpContext } from '@adonisjs/core/http'
import { StatusCodes } from 'http-status-codes'
import {
  deleteLogValidator,
  renderEditLogPageValidator,
  updateLogValidator,
} from '#validators/log/index'
import { inject } from '@adonisjs/core'
import { NepolarResponse } from '#lib/nepolar_response'

@inject()
export default class LogsDetailsController {
  constructor(protected logService: LogService) {}

  async renderEditLogPage({ inertia, request }: HttpContext) {
    const {
      params: { challengeId, logId },
    } = await request.validateUsing(renderEditLogPageValidator)

    const { error, log } = await this.logService.find(logId)

    if (error !== null) {
      return inertia.render('logs/create/index', {
        logId,
        log: null,
        challengeId,
        error,
      })
    }

    return inertia.render('logs/create/index', {
      logId,
      log,
      challengeId,
      error,
    })
  }

  async find({ params, response }: HttpContext) {
    const { id } = params
    const { error, log } = await this.logService.find(id)

    if (error !== null) {
      const errorResponse = NepolarResponse.error({
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Failed to fetch log',
        error: [
          {
            details: error.messages,
            message: 'Please provide valid and required data.',
            code: 'E_VALIDATION_ERROR',
          },
        ],
      })

      return response.status(StatusCodes.BAD_REQUEST).json(errorResponse)
    }

    const successResponse = NepolarResponse.success({
      statusCode: StatusCodes.OK,
      data: { log },
      message: 'Log fetched successfully',
    })

    return response.status(StatusCodes.OK).json(successResponse)
  }

  async update({ request, response }: HttpContext) {
    const { params, ...rest } = await request.validateUsing(updateLogValidator)

    if (!params.logId) {
      const errorResponse = NepolarResponse.error({
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Failed to update log',
        error: [
          {
            details: 'Please provide valid and required data.',
            message: 'Please provide valid and required data.',
            code: 'E_VALIDATION_ERROR',
          },
        ],
      })
      return response.status(StatusCodes.BAD_REQUEST).json(errorResponse)
    }

    const { error, log: updatedLog } = await this.logService.update(params.logId, rest)

    if (error !== null) {
      const errorResponse = NepolarResponse.error({
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Failed to update log',
        error: [
          {
            details: error.messages,
            message: 'Please provide valid and required data.',
            code: 'E_VALIDATION_ERROR',
          },
        ],
      })
      return response.status(StatusCodes.BAD_REQUEST).json(errorResponse)
    }

    const successResponse = NepolarResponse.success({
      statusCode: StatusCodes.OK,
      data: { log: updatedLog },
      message: 'Log updated successfully',
    })

    return response.status(StatusCodes.OK).json(successResponse)
  }

  async delete({ request, response }: HttpContext) {
    const {
      params: { logId },
    } = await request.validateUsing(deleteLogValidator)
    const { error } = await this.logService.delete(logId)

    if (error !== null) {
      const errorResponse = NepolarResponse.error({
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Failed to delete log',
        error: [
          {
            details: error.messages,
            message: 'Please provide valid and required data.',
            code: 'E_VALIDATION_ERROR',
          },
        ],
      })

      return response.status(StatusCodes.BAD_REQUEST).json(errorResponse)
    }

    const successResponse = NepolarResponse.success({
      statusCode: StatusCodes.OK,
      message: 'Log deleted successfully',
      data: null,
    })

    return response.status(StatusCodes.OK).json(successResponse)
  }
}
