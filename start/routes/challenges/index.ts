import router from '@adonisjs/core/services/router'

const ChallengeController = () => import('#controllers/challenge/challenges_controller')

export const challangesRoutes = router
  .group(() => {
    router.post('', [ChallengeController, 'create']).as('create')
  })
  .prefix('api/challenges')
  .as('challenge')
