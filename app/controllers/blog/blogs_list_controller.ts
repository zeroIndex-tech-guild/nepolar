import { BlogService } from '#services/blog'
import { createBlogValidator } from '#validators/blogs'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class BlogsListController {
  constructor(protected blogsService: BlogService) {}

  async renderBlogsListPage({ inertia }: HttpContext) {
    return inertia.render('blogs/index')
  }

  async renderBlogsCreatePage({ inertia }: HttpContext) {
    return inertia.render('blogs/create/index')
  }

  async create({ request }: HttpContext) {
    const payload = await request.validateUsing(createBlogValidator)

    return {
      payload,
    }
  }
}
