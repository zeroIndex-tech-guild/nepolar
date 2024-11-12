/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
router.on('/').renderInertia('home/index').as('home')

const RegisterController = () => import('#controllers/auth/register_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')

const DashboardController = () => import('#controllers/dashboard/dashboard_controller')
/*
|--------------------------------------------------------------------------
| View Routes :)
|--------------------------------------------------------------------------
|
| For rendering view
*/
router
  .group(() => {
    router.get('/signup', [RegisterController, 'show']).as('signup_page')
    router.get('/login', [LoginController, 'show']).as('login_page')
  })
  .as('auth')

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

router
  .group(() => {
    router.post('/signup', [RegisterController, 'create']).as('signup')
    router.post('/login', [LoginController, 'create']).as('login')
  })
  .prefix('/api/auth')
