import Log from '#models/log'
import { CreateLog, FindAllLogs } from '#types/log'

export class LogService {
  async create(log: Omit<CreateLog, 'params'>, challengeId: number) {
    try {
      const newLog = await Log.create({
        challengeId,
        content: log.content,
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

  async find(id: number) {
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

  async update(id: number, content: string) {
    try {
      const log = await Log.find(id)
      log?.merge({ content })
      await log?.save()
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
