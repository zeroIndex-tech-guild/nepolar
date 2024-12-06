/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.on('/').renderInertia('home/index').as('home')

const DashboardController = () => import('#controllers/dashboard/dashboard_controller')

/**
 * AUTH CONTROLLERS
 */
const RegisterController = () => import('#controllers/auth/register_controller')
const LoginController = () => import('#controllers/auth/login_controller')

/**
 * CHALLENGE CONTROLLERS
 */
const ChallengeListController = () => import('#controllers/challenge/challenges_list_controller')

const ChallengeDetailController = () =>
  import('#controllers/challenge/challenges_detail_controller')

/**
 * LOG CONTROLLERS
 */

const LogsListController = () => import('#controllers/log/logs_lists_controller')

const LogsDetailsController = () => import('#controllers/log/logs_details_controller')

/*
 * BLOGS CONTROLLERS
 */
const BlogsListController = () => import('#controllers/blog/blogs_list_controller')
const BlogDetailController = () => import('#controllers/blog/blog_detail_controller')
/*
 *
|--------------------------------------------------------------------------
| View Routes :)
|--------------------------------------------------------------------------
|
| For rendering view
*/

router.group(() => {
  /*
   * AUTH ROUTES
   */
  router
    .group(() => {
      router.get('/signup', [RegisterController, 'renderSignupPage']).as('signup_page')
      router.get('/login', [LoginController, 'renderLoginPage']).as('login_page')
    })
    .as('auth')

  /*
   * CHALLENGES ROUTES
   */
  router
    .group(() => {
      // shows the list of challenges
      router.get('', [ChallengeListController, 'renderChallengesPage']).as('list_page')

      // creates a new challenge
      router.get('/create', [ChallengeListController, 'renderCreatePage']).as('create_page')

      // shows the challenge detail
      router.get('/:challengeId', [ChallengeDetailController, 'renderDetailPage']).as('detail_page')

      // create /  edit the challenge
      // when creating /:challengeId => /create
      // whenEditing /:challengeId/edit
      router
        .get('/:challengeId/edit', [ChallengeDetailController, 'renderEditPage'])
        .as('edit_page')

      /*
       * LOGS ROUTES
       */
      router
        .group(() => {
          // shows the list of logs
          router.get('', [LogsListController, 'renderLogsPage']).as('list_page')

          // creates a new log
          router.get('/create', [LogsListController, 'renderCreateLogPage']).as('create_page')

          // shows the log detail
          router.get('/:logId', [LogsDetailsController, 'renderEditLogPage']).as('detail_page')

          // edit the log
          router.get('/:logId/edit', [LogsDetailsController, 'renderEditLogPage']).as('create_edit')
        })
        .prefix('/:challengeId/logs')
        .as('logs-page')
    })
    .prefix('/challenges')
    .as('challenges')
    .use(middleware.auth())

  /*
   * BLOGS ROUTES
   *
   */
  router
    .group(() => {
      router.get('', [BlogsListController, 'renderBlogsListPage']).as('list_page')
      router.get('/create', [BlogsListController, 'renderBlogsCreatePage']).as('create')
      router.get('/:blogId', [BlogDetailController, 'renderBlogDetailPage']).as('detail_page')
    })
    .prefix('/:userId/blogs')
    .as('user_blogs')

  /*
   * DASHBOARD ROUTES
   */
  router.get('/dashboard', [DashboardController, 'show']).as('dashboard_page')
})

/*
|--------------------------------------------------------------------------
| API ROUTES :)
|--------------------------------------------------------------------------
|
| For registering routes endpoints
*/

router
  .group(() => {
    /*
     * AUTH ROUTES
     */
    router
      .group(() => {
        router.post('/signup', [RegisterController, 'register']).as('signup')
        router.post('/login', [LoginController, 'login']).as('login')
      })
      .as('auth')
      .prefix('/auth')

    /*
     * CHALLENGES ROUTES
     */
    router
      .group(() => {
        router.post('', [ChallengeListController, 'create']).as('create')

        router.get('', [ChallengeListController, 'findAll']).as('findAll')

        router.get('/:challengeId', [ChallengeDetailController, 'read']).as('read')

        router.put('/:challengeId', [ChallengeDetailController, 'update']).as('update')

        router.delete('/:challengeId', [ChallengeDetailController, 'delete']).as('delete')

        /*
         * LOGS ROUTES
         */
        router
          .group(() => {
            router.post('', [LogsListController, 'create']).as('create')

            router.get('', [LogsListController, 'findMany']).as('findMany')

            router.get('/:logId', [LogsDetailsController, 'find']).as('find')

            router.put('/:logId', [LogsDetailsController, 'update']).as('update')

            router.delete('/:logId', [LogsDetailsController, 'delete']).as('delete')
          })
          .prefix('/:challengeId/logs')
          .as('logs-api')
      })
      .prefix('/challenges')
      .as('challenges-api')
      .use([middleware.auth()])

    /*
     * BLOGS ROUTES
     */
    router
      .group(() => {
        router.post('', [BlogsListController, 'create']).as('create')
      })
      .prefix('/:userId/blogs')
      .as('user_blogs-api')
  })
  .prefix('/api')
