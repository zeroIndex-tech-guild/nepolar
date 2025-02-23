import { NepolarResponse } from '#lib/nepolar_response'
import { BlogService } from '#services/blog'
import { updateBlogValidator } from '#validators/blogs'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { StatusCodes } from 'http-status-codes'

@inject()
export default class BlogDetailController {
  constructor(protected blogService: BlogService) {}

  async renderBlogDetailPage({ inertia, params }: HttpContext) {
    const { blogId } = params as { blogId: string; userId: string }

    const { data: blog } = await this.blogService.findOne(blogId)

    return inertia.render('blogs/detail/index', {
      blog,
      blogId,
    })
  }

  async renderBlogEditPage({ inertia, params }: HttpContext) {
    const { blogId } = params as { blogId: string; userId: string }

    const { data: blog } = await this.blogService.findOne(blogId)

    return inertia.render('blogs/create/index', {
      blog,
      isEditPage: true,
      blogId,
    })
  }

  async update({ request, response }: HttpContext) {
    const { params, ...payload } = await request.validateUsing(updateBlogValidator)

    const { data, error } = await this.blogService.update(params.blogId, payload)

    if (error !== null) {
      const errorResponse = NepolarResponse.error({
        message: 'Could not update blog',
        statusCode: StatusCodes.BAD_REQUEST,
        error: error,
      })

      return response.status(StatusCodes.BAD_REQUEST).json(errorResponse)
    }

    const successResponse = NepolarResponse.success({
      message: 'Blog updated successfully',
      data: data,
      statusCode: StatusCodes.OK,
    })

    return response.status(StatusCodes.OK).json(successResponse)
  }

  async delete({ params, response }: HttpContext) {
    const { blogId } = params as { blogId: string }

    const { error } = await this.blogService.delete(blogId)

    if (error !== null) {
      const errorResponse = NepolarResponse.error({
        message: 'Could not delete blog',
        statusCode: StatusCodes.BAD_REQUEST,
        error: error,
      })

      return response.status(StatusCodes.BAD_REQUEST).json(errorResponse)
    }

    const successResponse = NepolarResponse.success({
      data: null,
      message: 'Blog deleted successfully',
      statusCode: StatusCodes.OK,
    })

    return response.status(StatusCodes.OK).json(successResponse)
  }
}
