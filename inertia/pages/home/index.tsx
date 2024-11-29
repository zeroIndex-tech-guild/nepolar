import { LobbyLayout } from '~/components/layouts/lobby'
import { Typography } from '~/components/ui/typography'

export default function Home() {
  return <Typography.H1>Welcome to lobby</Typography.H1>
}

Home.layout = (page: React.ReactNode) => <LobbyLayout>{page}</LobbyLayout>
