import { LobbyLayout } from '~/components/layouts/lobby'

type Props = {}

export default function LobbyChallengesPage(props: Props) {
  return <div>LobbyChallengesPage</div>
}

LobbyChallengesPage.layout = (page: React.ReactNode) => <LobbyLayout>{page}</LobbyLayout>
