import { SuccessResponse } from '#sharedTypes/server-response'
import { User } from './user'

export type Blog = {
  id: string
  title: string
  content: string
  summary: string
  user: User
  userId: string
  createdAt: string
  updatedAt: string
}

export type CreateBlogResponse = SuccessResponse<Blog>

export type UpdateBlogResponse = CreateBlogResponse
