import router from '@adonisjs/core/services/router'

const ChallengeListController = () => import('#controllers/challenge/challenges_list_controller')

const ChallengeDetailController = () =>
  import('#controllers/challenge/challenges_detail_controller')

export const challangesRoutes = router
  .group(() => {
    router.get('', [ChallengeListController, 'show']).as('challenges_page')

    router.get('/:challengeId', [ChallengeDetailController, 'show']).as('challenge_detail_page')

    router
      .group(() => {
        router.get('', [ChallengeListController, 'findAll']).as('get')

        router.post('', [ChallengeListController, 'create']).as('create')
      })
      .prefix('api')
      .as('challenges-api')
  })
  .prefix('challenges')
  .as('challenge')
