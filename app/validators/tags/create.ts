import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const createTagValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3),
  })
)

export type TCreateTag = Infer<typeof createTagValidator>
