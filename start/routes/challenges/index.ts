import router from '@adonisjs/core/services/router'

const ChallengeListController = () => import('#controllers/challenge/challenges_list_controller')

const ChallengeDetailController = () =>
  import('#controllers/challenge/challenges_detail_controller')

//export const challangesRoutes = router
//  .group(() => {
//    router
//      .group(() => {})
//      .prefix('api')
//      .as('challenges-api')
//  })
//  .prefix('challenges')
//  .as('challenge')

export const challengesAPIRoutes = router
  .group(() => {
    router.get('', [ChallengeListController, 'findAll']).as('get')

    router.post('', [ChallengeListController, 'create']).as('create')
  })
  .prefix('/api/challenges')
  .as('challenges-api')

export const challengesViewRoutes = router
  .group(() => {
    router.get('', [ChallengeListController, 'show']).as('list_page')

    router.get('/:challengeId', [ChallengeDetailController, 'show']).as('detail_page')
  })
  .prefix('/challenges')
  .as('challenges')
