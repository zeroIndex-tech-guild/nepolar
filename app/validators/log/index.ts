import vine from '@vinejs/vine'

const logSchema = vine.object({
  content: vine.string().minLength(1),
  challengeId: vine.number(),
})

export const createLogValidator = vine.compile(logSchema)

export const updateLogValidator = vine.compile(
  vine.object({
    ...logSchema.getProperties(),
    logId: vine.number(),
  })
)

export const findLogValidator = vine.compile(vine.object({ logId: vine.number() }))

export const findAllLogsValidator = vine.compile(
  vine.object({
    challengeId: vine.number(),
    page: vine.number(),
    limit: vine.number(),
    orderBy: vine.enum(['desc', 'asc']),
  })
)

export const deleteLogValidator = vine.compile(
  vine.object({
    logId: vine.number(),
  })
)
