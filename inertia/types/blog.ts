import { SuccessResponse } from '#sharedTypes/server-response'
import { User } from './user'

export type Blog = {
  id: string
  title: string
  content: string
  user: User
  userId: string
  createdAt: string
  updatedAt: string
}

export type CreateBlogResponse = SuccessResponse<{
  blog: Blog
}>
