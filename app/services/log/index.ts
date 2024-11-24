import Challenge from '#models/challenge'
import Log from '#models/log'
import { CreateLog, FindAllLogs } from '#types/log'
import { inject } from '@adonisjs/core'
import dayjs from 'dayjs'

@inject()
export class LogService {
  calculateLogDay(startDate: string | null) {
    const isFirstLog = startDate === null

    if (isFirstLog) return 1

    const start = dayjs(new Date(startDate))
    const today = dayjs()

    return today.diff(start, 'day') + 1
  }

  async create(log: Omit<CreateLog, 'params'>, challengeId: number) {
    /*
     * When the log is created, lets check the start_date of challenge
     * and find the current day of the log
     * if the start_date is empty, we can assume it's the first day and today is day 1
     * i.e. start_date = first log creation date
     */

    try {
      const challenge = await Challenge.findOrFail(challengeId)

      const day = this.calculateLogDay(challenge.startDate)

      if (day === 1) {
        challenge.merge({ startDate: new Date().toDateString() })
        await challenge.save()
      }

      const newLog = await Log.create({
        challengeId,
        content: log.content,
        title: log.title,
        day,
      })
      return {
        log: newLog,
        error: null,
      }
    } catch (error) {
      return {
        log: null,
        error,
      }
    }
  }

  async findMany(challengeId: number, props: Omit<FindAllLogs, 'params'>) {
    try {
      const { page = 1, limit = 25, orderBy = 'desc' } = props
      const logs = await Log.query()
        .where('challenge_id', challengeId)
        .orderBy('created_at', orderBy)
        .paginate(page, limit)

      return {
        logs,
        error: null,
      }
    } catch (error) {
      return {
        logs: null,
        error,
      }
    }
  }

  async find(id: string) {
    try {
      const log = await Log.find(id)
      return {
        log,
        error: null,
      }
    } catch (error) {
      return {
        log: null,
        error,
      }
    }
  }

  async delete(logId: number) {
    try {
      const log = await Log.find(logId)
      await log?.delete()
      return {
        log,
        error: null,
      }
    } catch (error) {
      return {
        log: null,
        error,
      }
    }
  }

  async update(logId: string, log: Omit<CreateLog, 'params'>) {
    try {
      const currentLog = await Log.find(logId)
      currentLog?.merge(log)
      await currentLog?.save()
      return {
        log,
        error: null,
      }
    } catch (error) {
      return {
        log: null,
        error,
      }
    }
  }
}
