import vine from '@vinejs/vine'
import { paginationParams } from './params.js'

export const renderLobbyChallengesPageValidator = vine.compile(
  vine.object({
    params: vine.object({
      ...paginationParams.getProperties(),
    }),
  })
)
