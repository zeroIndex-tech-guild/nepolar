import { LobbyLayout } from '~/components/layouts/lobby'
import { Typography } from '~/components/ui/typography'
import { Challenge } from '~/types/challenge'
import { PaginationMeta } from '~/types/pagination-meta'

type Props = {
  challenges: {
    data: Challenge[]
    meta: PaginationMeta
  }
}

export default function Home(props: Props) {
  console.log(props)
  const { challenges: { data: challenges = [] } = {} } = props
  return (
    <div>
      <Typography.H1>Home</Typography.H1>

      <ul>
        {challenges.map((challenge) => (
          <li key={challenge.id}>{challenge.name}</li>
        ))}
      </ul>
    </div>
  )
}

Home.layout = (page: React.ReactNode) => <LobbyLayout>{page}</LobbyLayout>
