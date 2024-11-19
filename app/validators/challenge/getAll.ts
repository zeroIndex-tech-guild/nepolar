import vine from '@vinejs/vine'

export const getAllChallengeValidator = vine.compile(
  vine.object({
    page: vine.number(),
    limit: vine.number(),
    orderBy: vine.enum(['desc', 'asc']),
  })
)
