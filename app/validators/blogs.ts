import vine from '@vinejs/vine'

export const createBlogValidator = vine.compile(
  vine.object({
    title: vine.string(),
    content: vine.string(),
  })
)
