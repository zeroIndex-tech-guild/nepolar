import { SuccessResponse } from '#sharedTypes/server-response'
import { User } from '../user'

export type LoginResponse = SuccessResponse<{
  user: User
}>

export type RegisterResponse = SuccessResponse<{
  user: User
}>
