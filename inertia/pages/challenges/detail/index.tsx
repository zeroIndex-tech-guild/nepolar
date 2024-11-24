import { Link } from '@inertiajs/react'
import { DashboardLayout } from '~/components/layouts/dashboard'
import { Button } from '~/components/ui/button'
import { MDXEditor } from '~/components/ui/mdx-editor'
import { Typography } from '~/components/ui/typography'
import { Challenge } from '~/types/challenge'

type Props = {
  challenge: Challenge
  challengeId: string
}

export default function ChallengeDetailPage(props: Props) {
  const { challenge, challengeId } = props
  return (
    <div>
      <h1 className="text-3xl">{challenge.name}</h1>

      <div>
        <Button asChild variant="outline">
          <Link href={`${challengeId}/logs/create`}>Add a log</Link>
        </Button>

        <Button asChild variant="outline">
          <Link href={`${challengeId}/logs`}>Show all Logs</Link>
        </Button>
      </div>
      <MDXEditor markdown={challenge.description} readOnly={true} />

      <div>
        <Typography.Small>Description</Typography.Small>

        <p>{challenge.description}</p>
      </div>
    </div>
  )
}

ChallengeDetailPage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
