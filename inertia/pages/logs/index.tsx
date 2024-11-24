import { Log } from '~/types/log'
import { PaginationMeta } from '~/types/pagination-meta'

type Props = {
  logs: {
    data: Log[]
    meta: PaginationMeta
  }
}
export default function LogsPage(props: Props) {
  console.log(props)
  return <div>Logs</div>
}
