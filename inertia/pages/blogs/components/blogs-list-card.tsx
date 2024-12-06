import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Typography } from '~/components/ui/typography'
import { Blog } from '~/types/blog'

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
    },
  } = props

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Typography.H2>{title}</Typography.H2>
        </CardTitle>

        <Typography.P>
          <p>
            {createdAt} by {fullName}
          </p>
        </Typography.P>
      </CardHeader>

      <CardContent>{summary}</CardContent>
    </Card>
  )
}
