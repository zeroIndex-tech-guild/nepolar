import Blog from '#models/blog'
import { CreateBlog } from '#types/blog'

export class BlogService {
  async create(payload: Omit<CreateBlog, 'params'>, userId: number) {
    try {
      const newBlog = await Blog.create({
        ...payload,
        userId,
      })
      console.log({ newBlog })
      return {
        data: newBlog,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error,
      }
    }
  }

  async findAll({
    userId,
    page = 1,
    limit = 25,
    orderBy = 'desc',
  }: {
    userId: number
    page?: number
    limit?: number
    orderBy?: 'desc' | 'asc'
  }) {
    try {
      const blogs = await Blog.query()
        .where('user_id', userId)
        .orderBy('created_at', orderBy)
        .paginate(page, limit)

      return {
        blogs,
        error: null,
      }
    } catch (error) {
      return {
        blogs: null,
        error,
      }
    }
  }

  async fineOne(blogId: number) {
    try {
      const blog = await Blog.find(blogId)
      return {
        blog,
        error: null,
      }
    } catch (error) {
      return {
        blog: null,
        error,
      }
    }
  }
}
