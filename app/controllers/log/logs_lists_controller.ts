import { LogService } from '#services/log/index'
import { createLogValidator, findAllLogsValidator } from '#validators/log/index'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { NepoarResponse } from '../../lib/nepolar-response.js'
import { StatusCodes } from 'http-status-codes'

@inject()
export default class LogsListsController {
  constructor(protected logService: LogService) {}

  async renderLogsPage({ inertia, request }: HttpContext) {
    const {
      page = 1,
      limit = 25,
      orderBy = 'desc',
      params: { challengeId },
    } = await request.validateUsing(findAllLogsValidator)

    const { error, logs } = await this.logService.findMany(challengeId, {
      page,
      limit,
      orderBy,
    })

    if (error !== null) {
      return inertia.render('logs/index', {
        logs: null,
      })
    }

    return inertia.render('logs/index', {
      logs,
    })
  }

  async create({ request, response }: HttpContext) {
    const { params, content, title } = await request.validateUsing(createLogValidator)
    console.log({ params, content, title })

    const { log: newLog, error } = await this.logService.create(
      { content, title },
      params.challengeId
    )

    if (error !== null) {
      return response
        .status(StatusCodes.BAD_GATEWAY)
        .json(NepoarResponse.failure(error, 'Failed to create log'))
    }

    return NepoarResponse.success(newLog, 'Log created successfully')
  }

  async findMany({ request, response }: HttpContext) {
    const {
      page = 1,
      limit = 25,
      orderBy = 'desc',
      params: { challengeId },
    } = await request.validateUsing(findAllLogsValidator)

    const { error, logs } = await this.logService.findMany(challengeId, {
      page,
      limit,
      orderBy,
    })

    if (error !== null) {
      return response
        .status(StatusCodes.BAD_GATEWAY)
        .json(NepoarResponse.failure(error, 'Failed to fetch logs'))
    }

    return NepoarResponse.success(logs, 'Logs fetched successfully')
  }
}
