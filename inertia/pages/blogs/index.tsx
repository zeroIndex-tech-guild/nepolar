import { Link } from '@inertiajs/react'
import { DashboardLayout } from '~/components/layouts/dashboard'
import { Button } from '~/components/ui/button'
import { Typography } from '~/components/ui/typography'
import { Blog } from '~/types/blog'
import { PaginationMeta } from '~/types/pagination-meta'
import { BlogsList } from './components/blogs-list'

type Props = {
  blogs: {
    data: Blog[]
    meta: PaginationMeta
  }
}

export default function BlogsListPage(props: Props) {
  const { blogs } = props
  return (
    <main>
      <header className="flex flex-col gap-4 mb-8">
        <Typography.H1>Blogs</Typography.H1>
        <div>
          <Button variant={'outline'}>
            <Link href="/dashboard/blogs/create">Create Blog</Link>
          </Button>
        </div>
      </header>
      <BlogsList blogs={blogs.data} />
    </main>
  )
}

BlogsListPage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
