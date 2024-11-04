/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
router.on('/').renderInertia('home/index')

//router.on('/auth/login').renderInertia('auth/login').as('login')

const AuthController = () => import("#controllers/auth_controller")
router.group(() => {
  router.get("/auth/login", [AuthController, 'renderLoginPage']).as("login_page");

  router.get("/auth/signup", [AuthController, 'renderSignupPage']).as("signup_page");
})
