import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const paginationParams = vine.object({
  page: vine.number().optional(),
  limit: vine.number().optional(),
  orderBy: vine.enum(['desc', 'asc']).optional(),
})

export type PaginationParams = Infer<typeof paginationParams>
