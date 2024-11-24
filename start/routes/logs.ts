import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const LogsListController = () => import('#controllers/log/logs_lists_controller')

const LogsDetailsController = () => import('#controllers/log/logs_details_controller')

export const logsAPIRoutes = router
  .group(() => {
    router.post('', [LogsListController, 'create']).as('create')

    router.get('', [LogsListController, 'findMany']).as('findMany')

    router.get('/:logId', [LogsDetailsController, 'find']).as('find')

    router.put('/:logId', [LogsDetailsController, 'update']).as('update')

    router.delete('/:logId', [LogsDetailsController, 'delete']).as('delete')
  })
  .prefix('/api/logs/challenges/:challengeId/logs')
  .as('logs-api')
  .use(middleware.auth())

export const logsPageRoutes = router
  .group(() => {
    router.get('', [LogsListController, 'renderLogsPage']).as('list_page')

    router.get('/:logId', [LogsDetailsController, 'renderLogPage']).as('detail_page')

    router.get('/:logId/edit', [LogsDetailsController, 'renderLogPage']).as('edit_page')
  })
  .prefix('/challenges/:challengeId/logs')
  .as('logs-page')
  .use(middleware.auth())
