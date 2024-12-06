import { NepolarResponse } from '#lib/nepolar-response'
import { BlogService } from '#services/blog'
import { createBlogValidator } from '#validators/blogs'
import { inject } from '@adonisjs/core'
import { HttpContext, ResponseStatus } from '@adonisjs/core/http'

@inject()
export default class BlogsListController {
  constructor(protected blogsService: BlogService) {}

  async renderBlogsListPage({ inertia }: HttpContext) {
    const { data } = await this.blogsService.findAll({
      userId: 1,
      page: 1,
      limit: 25,
      orderBy: 'desc',
    })

    return inertia.render('blogs/index', {
      blogs: data,
    })
  }

  async renderBlogsCreatePage({ inertia }: HttpContext) {
    return inertia.render('blogs/create/index', {
      blog: null,
      isEditPage: false,
      blogId: 'new',
    })
  }

  async create({ request, response }: HttpContext) {
    const { params, ...payload } = await request.validateUsing(createBlogValidator)

    const userId = params.userId
    const { data, error } = await this.blogsService.create(payload, userId)

    if (error !== null) {
      const errorResponse = NepolarResponse.error({
        message: 'Failed to create blog',
        error,
        statusCode: ResponseStatus.BadRequest,
      })

      return response.status(errorResponse.statusCode).send(errorResponse)
    }

    const successResponse = NepolarResponse.success({
      message: 'Blog created successfully',
      data,
      statusCode: ResponseStatus.Created,
    })

    return response.status(successResponse.statusCode).send(successResponse)
  }
}
