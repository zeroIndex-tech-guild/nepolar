import { DashboardLayout } from '~/components/layouts/dashboard'
import { Challenge } from '~/types/challenge'
import { PaginationMeta } from '~/types/pagination-meta'
import { ChallengesTable } from './components/challenges-table'
import { Button } from '~/components/ui/button'
import { Link } from '@inertiajs/react'

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
      <h1 className="text-3xl mb-4">Challenges</h1>

      <div>
        <Button variant="outline" className="">
          <Link href="/dashboard/challenges/create">Create Challenge</Link>
        </Button>
      </div>

      <ChallengesTable data={data} />
    </div>
  )
}

ChallengePage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
