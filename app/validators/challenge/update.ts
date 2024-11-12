import vine from '@vinejs/vine'

export const updateChallengeValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3),
    days: vine.number(),
    tags: vine.array(vine.string()),
  })
)
