import vine from '@vinejs/vine'

const logSchema = vine.object({
  content: vine.string().minLength(1),

  params: vine.object({
    challengeId: vine.number(),
  }),
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
    page: vine.number().optional(),
    limit: vine.number().optional(),
    orderBy: vine.enum(['desc', 'asc']).optional(),

    params: vine.object({
      challengeId: vine.number(),
    }),
  })
)

export const deleteLogValidator = vine.compile(
  vine.object({
    logId: vine.number(),
  })
)

export const renderCreateLogPageValidator = vine.compile(
  vine.object({
    params: vine.object({
      challengeId: vine.number(),
    }),
  })
)
