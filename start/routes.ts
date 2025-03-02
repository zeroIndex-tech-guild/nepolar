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
import ZeroCloudinaryController from '#controllers/zero_cloudinary/index'

//router.on('/').renderInertia('home/index').as('home')

const LobbyController = () => import('#controllers/lobby/lobby_controller')
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

const ChallengeDetailController = () => import('#controllers/challenge/challenge_detail_controller')

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
 * Cloudinary CONTROLLERS
 */
const ZeroCloudinary = () => import('#controllers/zero_cloudinary/index')
/*
 *
|--------------------------------------------------------------------------
| View Routes :)
|--------------------------------------------------------------------------
|
| For rendering view
*/

/*
 * LOBBY ROUTES
 *
 */
router
  .group(() => {
    router.get('', [LobbyController, 'index']).as('view')
    router.get('/challenges', [LobbyController, 'renderChallengesPage']).as('lobby.challenges')
  })
  .as('lobby')

/*
 * AUTH ROUTES
 */
router
  .group(() => {
    router.get('/signup', [RegisterController, 'renderSignupPage']).as('signup')
    router.get('/login', [LoginController, 'renderLoginPage']).as('login')
  })
  .as('auth-page')

/*
 * DASHBOARD ROUTES
 */

router
  .group(() => {
    // Dashboard route
    router.get('', [DashboardController, 'show']).as('dashboard.show')

    /*
     * CHALLENGE ROUTES
     */
    router
      .group(() => {
        // Challenge list
        router.get('', [ChallengeListController, 'renderChallengesPage']).as('challenges.list')

        // Create new challenge
        router.get('/create', [ChallengeListController, 'renderCreatePage']).as('challenges.create')

        // Challenge detail
        router
          .get('/:challengeId', [ChallengeDetailController, 'renderDetailPage'])
          .as('challenges.detail')

        // Edit challenge
        router
          .get('/:challengeId/edit', [ChallengeDetailController, 'renderEditPage'])
          .as('challenges.edit')

        /*
         * LOGS ROUTES (Subgroup within challenges)
         */
        router
          .group(() => {
            // Log list
            router.get('', [LogsListController, 'renderLogsPage']).as('challenges.logs.list')

            // Create new log
            router
              .get('/create', [LogsListController, 'renderCreateLogPage'])
              .as('challenges.logs.create')

            // Log detail
            router
              .get('/:logId', [LogsDetailsController, 'renderEditLogPage'])
              .as('challenges.logs.detail')

            // Edit log
            router
              .get('/:logId/edit', [LogsDetailsController, 'renderEditLogPage'])
              .as('challenges.logs.edit')
          })
          .prefix('/:challengeId/logs')
      })
      .prefix('/challenges')

    /*
     * BLOGS ROUTES
     */
    router
      .group(() => {
        // Blog list
        router.get('', [BlogsListController, 'renderBlogsListPage']).as('blogs.list')

        // Create new blog
        router.get('/create', [BlogsListController, 'renderBlogsCreatePage']).as('blogs.create')

        // Blog detail
        router.get('/:blogId', [BlogDetailController, 'renderBlogDetailPage']).as('blogs.detail')

        // Edit blog
        router.get('/:blogId/edit', [BlogDetailController, 'renderBlogEditPage']).as('blogs.edit')
      })
      .prefix('/blogs')
  })
  .prefix('/dashboard')
  .as('dashboard')
  .use(middleware.auth())

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
        router.post('/signup', [RegisterController, 'register']).as('auth.signup')
        router.post('/login', [LoginController, 'login']).as('auth.login')
      })
      .as('auth')
      .prefix('/auth')

    /*
     * USERS API
     * FOR USERS THEMSELVES
     */
    router
      .group(() => {
        /*
         * CHALLENGE ROUTES
         */
        router
          .group(() => {
            // Challenge routes
            router.post('', [ChallengeListController, 'createNewChallenge']).as('challenges.create')
            router
              .get('', [ChallengeListController, 'findChallengesForCurrentUser'])
              .as('challenges.findAllForCurrentUser')
            router.get('/:challengeId', [ChallengeDetailController, 'read']).as('challenges.read')
            router
              .put('/:challengeId', [ChallengeDetailController, 'update'])
              .as('challenges.update')
            router
              .delete('/:challengeId', [ChallengeDetailController, 'delete'])
              .as('challenges.delete')

            /*
             * LOGS ROUTES (Nested under challenge)
             */
            router
              .group(() => {
                router.post('', [LogsListController, 'create']).as('challenges.logs.create')
                router.get('', [LogsListController, 'findMany']).as('challenges.logs.findMany')
                router.get('/:logId', [LogsDetailsController, 'find']).as('challenges.logs.find')
                router
                  .put('/:logId', [LogsDetailsController, 'update'])
                  .as('challenges.logs.update')
                router
                  .delete('/:logId', [LogsDetailsController, 'delete'])
                  .as('challenges.logs.delete')
              })
              .prefix('/:challengeId/logs')
              .as('challenges.logs')
          })
          .prefix('/challenges')
          .as('challenges')
          .use([middleware.auth()])

        /*
         * BLOG ROUTES
         */
        router
          .group(() => {
            router.post('', [BlogsListController, 'create']).as('blogs.create')
            router.put('/:blogId', [BlogDetailController, 'update']).as('blogs.update')
            router.delete('/:blogId', [BlogDetailController, 'delete']).as('blogs.delete')
          })
          .prefix('/blogs')
          .as('blogs')
      })
      .prefix('/users/:userId')
      .as('users')
      .use([middleware.auth()])

    /*
     * Cloudinary API
     */
    router
      .group(() => {
        router
          .post('/mdx-image', [ZeroCloudinaryController, 'mdxImageUpload'])
          .as('mdx-image-upload')
      })
      .as('uploads')
      .prefix('/uploads')
      .use([middleware.auth()])
  })
  .prefix('/api/v1')
  .as('api-v1')
