import router from '@adonisjs/core/services/router'
import { SIGNUP, LOGIN } from '#endpoints/auth'

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
    router.post(SIGNUP, [RegisterController, 'create']).as('signup')
    router.post(LOGIN, [LoginController, 'login']).as('login')
  })
  .prefix('/api')
