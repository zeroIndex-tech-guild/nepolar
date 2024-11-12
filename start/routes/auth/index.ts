import router from '@adonisjs/core/services/router'

const RegisterController = () => import('#controllers/auth/register_controller')
const LoginController = () => import('#controllers/auth/login_controller')

router
  .group(() => {
    router.get('/signup', [RegisterController, 'show']).as('signup_page')
    router.get('/login', [LoginController, 'show']).as('login_page')
  })
  .as('auth')

router
  .group(() => {
    router.post('/signup', [RegisterController, 'create']).as('signup')
    router.post('/login', [LoginController, 'create']).as('login')
  })
  .prefix('/api/auth')
