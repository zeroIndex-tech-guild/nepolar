import { PageProps } from '@adonisjs/inertia/types'
import { HttpContext } from '@adonisjs/core/http'
import { ServerResponse } from '#sharedTypes/server-response'

export interface ICrudListController<T> {
  /**
   * Renders the list page with data fetched via `findMany`.
   * @route [GET] '/challenges'
   */
  listPage(context: HttpContext): Promise<string | PageProps>

  /**
   * Renders the page to create a new resource.
   * @route [GET] '/challenges/create'
   */
  createPage(context: HttpContext): Promise<string | PageProps>

  /**
   * API endpoint to fetch a list of resources.
   * @route [GET] 'api/challenges'
   */
  findMany(context: HttpContext): Promise<ServerResponse<T[]>>

  /**
   * API endpoint to create a new resource.
   * @route [POST] '/api/challenges'
   */
  create(context: HttpContext): Promise<ServerResponse<T>>
}

export interface ICrudDetailsController<T> {
  /**
   * Renders the page to create or edit a resource.
   * - If `challengeId` is "edit", renders edit form.
   * @route [GET] '/challenges/:challengeId/edit'
   */
  editPage(context: HttpContext): Promise<string | PageProps>

  /**
   * Renders the detail page for a specific resource.
   * @route [GET] '/challenges/:challengeId'
   */
  detailPage(context: HttpContext): Promise<string | PageProps>

  /**
   * API endpoint to fetch a single resource.
   * @route [GET] 'api/challenges/:challengeId'
   */
  findOne(context: HttpContext): Promise<ServerResponse<T>>

  /**
   * API endpoint to update a specific resource.
   * @route [PUT] 'api/challenges/:challengeId'
   */
  update(context: HttpContext): Promise<ServerResponse<T>>

  /**
   * API endpoint to delete a specific resource.
   * @route [DELETE] 'api/challenges/:challengeId'
   */
  delete(context: HttpContext): Promise<ServerResponse<T>>
}
