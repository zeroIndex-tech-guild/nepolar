import { SuccessResponse } from '#sharedTypes/server-response'
import { PaginationMeta } from './pagination-meta'
import { Tag } from './tag'

export type Challenge = {
  id: string
  name: string
  description: string
  days: number
  tags: Tag[]
  userId: string
  createdAt: string
  updatedAt: string
}

export type CreateChallengeResponse = SuccessResponse<{
  challenge: Challenge
}>

export type UpdateChallengeResponse = CreateChallengeResponse

export type DeleteChallengeResponse = SuccessResponse<null>

export type GetAllChallengesResponse = SuccessResponse<{
  data: {
    challenges: Challenge[]
    meta: PaginationMeta
  }
}>
