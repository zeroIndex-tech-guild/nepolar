import vine from '@vinejs/vine'

export const findChallengesForCurrentUser = vine.compile(
  vine.object({
    page: vine.number(),
    limit: vine.number(),
    orderBy: vine.enum(['desc', 'asc']),
  })
)
