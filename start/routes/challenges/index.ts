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
    // shows the list of challenges
    router.get('', [ChallengeListController, 'show']).as('list_page')

    // creates a new challenge
    //router.get('/new', [ChallengeDetailController, 'new']).as('create_page')

    // shows the challenge detail
    router.get('/:challengeId', [ChallengeDetailController, 'detail']).as('detail_page')

    // edit the challenge
    router.get('/:challengeId/edit', [ChallengeDetailController, 'edit']).as('edit_page')
  })
  .prefix('/challenges')
  .as('challenges')
  .use(middleware.auth())
