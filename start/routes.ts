/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import './routes/auth/index.js'
import './routes/challenges/index.js'

import './routes/logs.js'

router.on('/').renderInertia('home/index').as('home')

const DashboardController = () => import('#controllers/dashboard/dashboard_controller')
/*
|--------------------------------------------------------------------------
| View Routes :)
|--------------------------------------------------------------------------
|
| For rendering view
*/

router.group(() => {
  router.get('/dashboard', [DashboardController, 'show']).as('dashboard_page')
})

/*
|--------------------------------------------------------------------------
| API Routes :)
|--------------------------------------------------------------------------
|
| For registering routes endpoints
*/
