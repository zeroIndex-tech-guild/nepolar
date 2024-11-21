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
