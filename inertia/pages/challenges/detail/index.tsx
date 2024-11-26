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
      <Typography.H1>{challenge.name}</Typography.H1>

      <div className="flex gap-4 py-4">
        <Button asChild variant="outline">
          <Link href={`${challengeId}/logs/create`}>Add a log</Link>
        </Button>

        <Button asChild variant="outline">
          <Link href={`${challengeId}/logs`}>Show all Logs</Link>
        </Button>
      </div>
      <MDXEditor markdown={challenge.description} readOnly={true} />
    </div>
  )
}

ChallengeDetailPage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
