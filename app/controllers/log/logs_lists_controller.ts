import { NepolarResponse } from '#lib/nepolar_response'
import { LogService } from '#services/log/index'
import {
  createLogValidator,
  findAllLogsValidator,
  renderCreateLogPageValidator,
} from '#validators/log/index'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
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

  async renderCreateLogPage({ inertia, request }: HttpContext) {
    const {
      params: { challengeId },
    } = await request.validateUsing(renderCreateLogPageValidator)

    return inertia.render('logs/create/index', {
      log: null,
      error: null,
      challengeId,
    })
  }

  async create({ request, response }: HttpContext) {
    console.log('create', request.params())
    const { params, content, title } = await request.validateUsing(createLogValidator)
    console.log({ params, content, title })

    const { log: newLog, error } = await this.logService.create(
      { content, title },
      params.challengeId
    )

    if (error !== null) {
      const errorResponse = NepolarResponse.error({
        statusCode: StatusCodes.BAD_GATEWAY,
        message: 'Failed to create log',
        error: [error],
      })
      return response.status(StatusCodes.BAD_GATEWAY).json(errorResponse)
    }

    const successResponse = NepolarResponse.success({
      data: newLog,
      message: 'Log created successfully',
      statusCode: StatusCodes.CREATED,
    })
    return response.status(StatusCodes.CREATED).json(successResponse)
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
      const errorResponse = NepolarResponse.error({
        statusCode: StatusCodes.BAD_GATEWAY,
        message: 'Failed to fetch logs',
        error: [error],
      })

      return response.status(StatusCodes.BAD_GATEWAY).json(errorResponse)
    }

    const successResponse = NepolarResponse.success({
      data: logs,
      message: 'Logs fetched successfully',
      statusCode: StatusCodes.OK,
    })
    return response.status(StatusCodes.OK).json(successResponse)
  }
}
