import { INepolarResponse } from '#sharedTypes/server-response'
import { User } from '../user'

export type LoginResponse = INepolarResponse<{
  user: User
}>
