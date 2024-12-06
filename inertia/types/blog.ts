import { SuccessResponse } from '#sharedTypes/server-response'

export type Blog = {
  id: string
  title: string
  content: string
  userId: string
}

export type CreateBlogResponse = SuccessResponse<{
  blog: Blog
}>
