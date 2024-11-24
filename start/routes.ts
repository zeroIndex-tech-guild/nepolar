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
      router.get('/signup', [RegisterController, 'show']).as('signup_page')
      router.get('/login', [LoginController, 'show']).as('login_page')
    })
    .as('auth')

  /*
   * CHALLENGES ROUTES
   */
  router
    .group(() => {
      // shows the list of challenges
      router.get('', [ChallengeListController, 'show']).as('list_page')

      // creates a new challenge
      //router.get('/new', [ChallengeDetailController, 'new']).as('create_page')

      // shows the challenge detail
      router.get('/:challengeId', [ChallengeDetailController, 'detail']).as('detail_page')

      // edit the challenge
      router.get('/:challengeId/edit', [ChallengeDetailController, 'edit']).as('edit_page')

      /*
       * LOGS ROUTES
       */
      router
        .group(() => {
          router.get('', [LogsListController, 'renderLogsPage']).as('list_page')

          router.get('/:logId', [LogsDetailsController, 'renderLogPage']).as('detail_page')

          router.get('/:logId/edit', [LogsDetailsController, 'renderLogPage']).as('edit_page')
        })
        .prefix('/:challengeId/logs')
        .as('logs-page')
    })
    .prefix('/challenges')
    .as('challenges')
    .use(middleware.auth())

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
        router.post('/signup', [RegisterController, 'create']).as('signup')
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
  })
  .prefix('/api')
