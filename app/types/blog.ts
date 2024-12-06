import { createBlogValidator } from '#validators/blogs'
import { Infer } from '@vinejs/vine/types'

export type CreateBlog = Infer<typeof createBlogValidator>
