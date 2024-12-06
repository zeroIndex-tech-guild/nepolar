import { HttpContext } from '@adonisjs/core/http'

export default class BlogsListController {
  async renderBlogsListPage({ request, inertia }: HttpContext) {
    return inertia.render('blogs/index')
  }
}
