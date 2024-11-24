import { DashboardLayout } from '~/components/layouts/dashboard'
import { LogsTimeline } from '~/components/timeline/logs-timeline'
import { Typography } from '~/components/ui/typography'
import { Log } from '~/types/log'
import { PaginationMeta } from '~/types/pagination-meta'

type Props = {
  logs: {
    data: Log[]
    meta: PaginationMeta
  }
}

export default function LogsPage(props: Props) {
  const {
    logs: { data },
  } = props

  return (
    <div>
      <Typography.H1 className="mb-6">Logs</Typography.H1>

      <div className="flex justify-center">
        <LogsTimeline items={data} />
      </div>
    </div>
  )
}

LogsPage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
