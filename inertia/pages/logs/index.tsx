import { DashboardLayout } from '~/components/layouts/dashboard'
import { TimelineLayout } from '~/components/timeline/timeline-layout'
import { Typography } from '~/components/ui/typography'
import { Log } from '~/types/log'
import { PaginationMeta } from '~/types/pagination-meta'

type Props = {
  logs: {
    data: Log[]
    meta: PaginationMeta
  }
}

const timelineData = [
  {
    id: 1,
    title: 'First event',
    date: '2022-01-01',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio euismod lacinia at quis risus sed vulputate odio ut. Quam viverra orci sagittis eu volutpat odio facilisis mauris.',
  },
  {
    id: 2,
    title: 'Second event',
    date: '2022-02-01',
    description:
      'Aut eius excepturi ex recusandae eius est minima molestiae. Nam dolores iusto ad fugit reprehenderit hic dolorem quisquam et quia omnis non suscipit nihil sit libero distinctio. Ad dolorem tempora sit nostrum voluptatem qui tempora unde? Sit rerum magnam nam ipsam nesciunt aut rerum necessitatibus est quia esse non magni quae.',
  },
  {
    id: 3,
    title: 'Third event',
    date: '2022-03-01',
    description:
      'Sit culpa quas ex nulla animi qui deleniti minus rem placeat mollitia. Et enim doloremque et quia sequi ea dolores voluptatem ea rerum vitae. Aut itaque incidunt est aperiam vero sit explicabo fuga id optio quis et molestiae nulla ex quae quam. Ab eius dolores ab tempora dolorum eos beatae soluta At ullam placeat est incidunt cumque.',
  },
]

export default function LogsPage(props: Props) {
  console.log(props)
  return (
    <div>
      <Typography.H1 className="mb-6">Logs</Typography.H1>

      <div className="flex justify-center">
        <TimelineLayout items={timelineData} />
      </div>
    </div>
  )
}

LogsPage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
