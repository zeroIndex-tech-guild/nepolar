import { DashboardLayout } from '~/components/layouts/dashboard'
import { Challenge } from '~/types/challenge'

type Props = {
  challenge: Challenge
  challengeId: string
}

export default function ChallengeDetailPage(props: Props) {
  console.log({ props })
  return <div>ChallengeDetailPage</div>
}

ChallengeDetailPage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
