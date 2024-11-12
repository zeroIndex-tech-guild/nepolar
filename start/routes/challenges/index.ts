import router from '@adonisjs/core/services/router'

const ChallengeController = () => import('#controllers/challenge/challenges_controller')

export const challangesRoutes = router
  .group(() => {
    router.get('/challenges', [ChallengeController, 'show']).as('challenges_page')

    router
      .group(() => {
        router.get('', [ChallengeController, 'findAll']).as('get')

        router.post('', [ChallengeController, 'create']).as('create')

        router.get('/:challengeId', [ChallengeController, 'read']).as('read')

        router.put('/:challengeId', [ChallengeController, 'update']).as('update')

        router.delete('/:challengeId', [ChallengeController, 'delete']).as('delete')
      })
      .prefix('api/challenges')
  })
  .as('challenge')
