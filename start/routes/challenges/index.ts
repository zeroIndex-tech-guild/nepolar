import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const ChallengeListController = () => import('#controllers/challenge/challenges_list_controller')

const ChallengeDetailController = () =>
  import('#controllers/challenge/challenges_detail_controller')

export const challengesAPIRoutes = router
  .group(() => {
    router.post('', [ChallengeListController, 'create']).as('create')

    router.get('', [ChallengeListController, 'findAll']).as('findAll')

    router.get('/:challengeId', [ChallengeDetailController, 'read']).as('read')

    router.put('/:challengeId', [ChallengeDetailController, 'update']).as('update')

    router.delete('/:challengeId', [ChallengeDetailController, 'delete']).as('delete')
  })
  .prefix('/api/challenges')
  .as('challenges-api')
  .use(middleware.auth())

export const challengesViewRoutes = router
  .group(() => {
    router.get('', [ChallengeListController, 'show']).as('list_page')

    router.get('/:challengeId', [ChallengeDetailController, 'show']).as('detail_page')
  })
  .prefix('/challenges')
  .as('challenges')
  .use(middleware.auth())
