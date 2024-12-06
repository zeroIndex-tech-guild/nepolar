import Blog from '#models/blog'
import { CreateBlog } from '#types/blog'
import { inject } from '@adonisjs/core'
import { SummaryGeneration } from './summary-generation.js'
import { UpdateBlogValues } from '#validators/blogs'

@inject()
export class BlogService {
  constructor(protected summaryGeneration: SummaryGeneration) {}

  async create(payload: Omit<CreateBlog, 'params'>, userId: number) {
    try {
      const summary = this.summaryGeneration.generateSummary(payload.content)

      const newBlog = await Blog.create({
        ...payload,
        summary,
        userId,
      })
      return {
        data: newBlog,
        error: null,
      }
    } catch (error) {
      console.log({ error })
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
        .preload('user')
        .orderBy('created_at', orderBy)
        .paginate(page, limit)

      return {
        data: blogs,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error,
      }
    }
  }

  async findOne(blogId: string) {
    try {
      const blog = await Blog.query().where('id', blogId).preload('user').firstOrFail()
      return {
        data: blog,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error,
      }
    }
  }

  async update(blogId: string, payload: Omit<UpdateBlogValues, 'params'>) {
    try {
      const blog = await Blog.findOrFail(blogId)
      await blog.merge(payload).save()
      return {
        data: blog,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error,
      }
    }
  }

  async delete(blogId: string) {
    try {
      const blog = await Blog.findOrFail(blogId)
      await blog.delete()
      return {
        data: null,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error,
      }
    }
  }
}
