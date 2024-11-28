import { SuccessResponse } from '#sharedTypes/server-response'

export type Log = {
  id: string
  title: string
  day: number
  content: string
  challengeId: number

  createdAt: Date
  updatedAt: Date
}

export type CreateLogResponse = SuccessResponse<{
  log: Log
}>

export type UpdateLogResponse = CreateLogResponse

export type DeleteLogResponse = SuccessResponse<null>
