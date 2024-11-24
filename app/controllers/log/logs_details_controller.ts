import { LogService } from '#services/log/index'
import type { HttpContext } from '@adonisjs/core/http'
import { NepoarResponse } from '../../lib/nepolar-response.js'
import { StatusCodes } from 'http-status-codes'
import {
  deleteLogValidator,
  findLogValidator,
  renderCreateLogPageValidator,
  updateLogValidator,
} from '#validators/log/index'
import { inject } from '@adonisjs/core'

@inject()
export default class LogsDetailsController {
  constructor(protected logService: LogService) {}

  async renderCreateNewLogPage({ inertia, request }: HttpContext) {
    const {
      params: { challengeId },
    } = await request.validateUsing(renderCreateLogPageValidator)

    return inertia.render('logs/create/index', {
      challengeId,
    })
  }

  async renderLogPage({ inertia, request }: HttpContext) {
    const { logId } = await request.validateUsing(findLogValidator)

    const { error, log } = await this.logService.find(logId)

    if (error !== null) {
      return inertia.render('logs/index', {
        log: null,
      })
    }

    return inertia.render('logs/index', {
      log,
    })
  }

  async find({ params, response }: HttpContext) {
    const { id } = params
    const { error, log } = await this.logService.find(id)

    if (error !== null) {
      return response
        .status(StatusCodes.BAD_GATEWAY)
        .json(NepoarResponse.failure(error, 'Failed to fetch log'))
    }

    return NepoarResponse.success(log, 'Log fetched successfully')
  }

  async update({ request, response }: HttpContext) {
    const log = await request.validateUsing(updateLogValidator)

    const { error, log: updatedLog } = await this.logService.update(log.logId, log.content)

    if (error !== null) {
      return response
        .status(StatusCodes.BAD_GATEWAY)
        .json(NepoarResponse.failure(error, 'Failed to update log'))
    }

    return NepoarResponse.success(updatedLog, 'Log updated successfully')
  }

  async delete({ request, response }: HttpContext) {
    const { logId } = await request.validateUsing(deleteLogValidator)
    const { error } = await this.logService.delete(logId)

    if (error !== null) {
      return response
        .status(StatusCodes.BAD_GATEWAY)
        .json(NepoarResponse.failure(error, 'Failed to delete log'))
    }

    return NepoarResponse.success(null, 'Log deleted successfully')
  }
}
