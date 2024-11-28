import { createLogValidator, findAllLogsValidator, updateLogValidator } from '#validators/log/index'

import { Infer } from '@vinejs/vine/types'

export type CreateLog = Infer<typeof createLogValidator>

export type UpdateLog = Infer<typeof updateLogValidator>

export type FindAllLogs = Infer<typeof findAllLogsValidator>
