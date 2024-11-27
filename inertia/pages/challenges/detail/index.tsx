import { Link } from '@inertiajs/react'
import { DashboardLayout } from '~/components/layouts/dashboard'
import { Button } from '~/components/ui/button'
import { MDXEditor } from '~/components/ui/mdx-editor'
import { Typography } from '~/components/ui/typography'
import { Challenge } from '~/types/challenge'
import { DeleteChallengeAlert } from '../components/delete-challenge-alert'
import { Edit2 } from 'lucide-react'
import { TagsDisplay } from '~/components/ui/tags-display'

type Props = {
  challenge: Challenge
  challengeId: string
}

export default function ChallengeDetailPage(props: Props) {
  const { challenge, challengeId } = props

  const tags = challenge.tags.map((tag) => tag.name)

  return (
    <div>
      <header className="flex items-center gap-8 group">
        <Typography.H1>{challenge.name}</Typography.H1>

        <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition">
          <DeleteChallengeAlert challengeId={challengeId} />
          <Link href={`${challengeId}/edit`}>
            <Edit2 className="hover:text-blue-500" />
          </Link>
        </div>
      </header>
      <div className="flex gap-4 py-4">
        <Button asChild variant="outline">
          <Link href={`${challengeId}/logs/create`}>Add a log</Link>
        </Button>

        <Button asChild variant="outline">
          <Link href={`${challengeId}/logs`}>Show all Logs</Link>
        </Button>
      </div>

      <article>
        <div className="flex gap-2">
          <TagsDisplay tags={tags} />
        </div>
        <MDXEditor markdown={challenge.description} readOnly={true} />
      </article>
    </div>
  )
}

ChallengeDetailPage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
