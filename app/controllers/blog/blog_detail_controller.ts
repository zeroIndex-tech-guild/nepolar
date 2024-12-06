import { BlogService } from '#services/blog'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

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
}
