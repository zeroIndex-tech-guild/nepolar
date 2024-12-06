import Blog from '#models/blog'
import { CreateBlog } from '#types/blog'
import { inject } from '@adonisjs/core'
import { SummaryGeneration } from './summary-generation.js'

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

  async fineOne(blogId: number) {
    try {
      const blog = await Blog.find(blogId)
      return {
        data: blog,
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
