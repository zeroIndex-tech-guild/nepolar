import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const createBlogValidator = vine.compile(
  vine.object({
    title: vine.string(),
    content: vine.string(),
  })
)

export type CreateBlogValues = Infer<typeof createBlogValidator>

export const updateBlogValidator = vine.compile(
  vine.object({
    title: vine.string(),
    content: vine.string(),

    params: vine.object({
      blogId: vine.string(),
    }),
  })
)

export type UpdateBlogValues = Infer<typeof updateBlogValidator>
