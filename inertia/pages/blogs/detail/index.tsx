import { DashboardLayout } from '~/components/layouts/dashboard'
import { MDXEditor } from '~/components/ui/mdx-editor'
import { Typography } from '~/components/ui/typography'
import { Blog } from '~/types/blog'

type Props = {
  blog: Blog
  blogId: string
}

export default function BlogDetailPage(props: Props) {
  const { blog } = props

  console.log(blog.createdAt)
  return (
    <div>
      <header>
        <Typography.H1 className="mb-2">{blog.title}</Typography.H1>

        <div className="flex gap-4">
          <Typography.Muted>By {blog.user.fullName}</Typography.Muted>
        </div>
      </header>
      <MDXEditor markdown={blog.content} readOnly />
    </div>
  )
}

BlogDetailPage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
