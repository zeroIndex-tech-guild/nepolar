import { Link } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Typography } from '~/components/ui/typography'
import { Blog } from '~/types/blog'
import { userId } from '~/store/user-store'

type Props = {
  blog: Blog
}

export const BlogListCard = (props: Props) => {
  const {
    blog: {
      user: { fullName },
      title,
      summary,
      createdAt,
      id,
    },
  } = props

  const url = `/${userId}/blogs/${id}`

  return (
    <Link href={url}>
      <Card className="hover:border-primary hover:bg-purple-800 transition cursor-pointer shadow-md">
        <CardHeader>
          <CardTitle>
            <Typography.H2 className="capitalize">{title}</Typography.H2>
          </CardTitle>

          <Typography.P>
            <p className="capitalize">
              {createdAt} by {fullName}
            </p>
          </Typography.P>
        </CardHeader>

        <CardContent>{summary}</CardContent>
      </Card>
    </Link>
  )
}
