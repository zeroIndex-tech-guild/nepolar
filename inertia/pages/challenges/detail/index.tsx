import { DashboardLayout } from '~/components/layouts/dashboard'
import { MDXEditor } from '~/components/ui/mdx-editor'
import { Challenge } from '~/types/challenge'

type Props = {
  challenge: Challenge
  challengeId: string
}

export default function ChallengeDetailPage(props: Props) {
  const { challenge, challengeId } = props
  return (
    <div>
      <h1>{challenge.name}</h1>

      <MDXEditor markdown={challenge.description} readOnly={true} />
      <p>{challenge.description}</p>
    </div>
  )
}

ChallengeDetailPage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
