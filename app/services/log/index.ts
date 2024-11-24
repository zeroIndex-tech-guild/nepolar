import Log from '#models/log'
import { CreateLog, FindAllLogs } from '#types/log'

export class LogService {
  async create(log: CreateLog) {
    try {
      const newLog = await Log.create({
        challengeId: log.challengeId,
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

  async findMany(props: FindAllLogs) {
    try {
      const { challengeId, page = 1, limit = 25, orderBy = 'desc' } = props
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
}
