import { DashboardLayout } from '~/components/layouts/dashboard'
import { Challenge } from '~/types/challenge'
import { PaginationMeta } from '~/types/pagination-meta'
import { ChallengesTable } from './components/challenges-table'

type Props = {
  challenges: {
    data: Challenge[]
    meta: PaginationMeta
  }
}

export default function ChallengePage(props: Props) {
  const {
    challenges: { data },
  } = props

  return (
    <div className="">
      <h1 className="text-3xl">Challenges</h1>

      <ChallengesTable data={data} />
    </div>
  )
}

ChallengePage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
