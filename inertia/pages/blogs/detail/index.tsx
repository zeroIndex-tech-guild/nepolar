import { Edit2 } from 'lucide-react'
import { DashboardLayout } from '~/components/layouts/dashboard'
import { MDXEditor } from '~/components/ui/mdx-editor'
import { Typography } from '~/components/ui/typography'
import { Blog } from '~/types/blog'
import { DeleteBlogAlert } from '../components/delete-blog-alert'
import { Link } from '@inertiajs/react'

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
        <div className="flex gap-4 items-center group">
          <Typography.H1 className="mb-2">{blog.title}</Typography.H1>

          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100">
            <DeleteBlogAlert blogId={blog.id} />

            <Link href={`/blogs/${blog.id}/edit`}>
              <Edit2 className="hover:text-blue-500" />
            </Link>
          </div>
        </div>

        <div className="flex gap-4">
          <Typography.Muted>By {blog.user.fullName}</Typography.Muted>
        </div>
      </header>
      <MDXEditor markdown={blog.content} readOnly />
    </div>
  )
}

BlogDetailPage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
