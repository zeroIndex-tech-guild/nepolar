import { Link } from '@inertiajs/react'
import { DashboardLayout } from '~/components/layouts/dashboard'
import { Button } from '~/components/ui/button'
import { Typography } from '~/components/ui/typography'
import { Blog } from '~/types/blog'
import { PaginationMeta } from '~/types/pagination-meta'

type Props = {
  blogs: Blog[]
  meta: PaginationMeta
}

export default function BlogsListPage(props: Props) {
  console.log(props)
  return (
    <main>
      <header className="flex flex-col gap-4 mb-8">
        <Typography.H1>Blogs</Typography.H1>
        <div>
          <Button variant={'outline'}>
            <Link href="/1/blogs/create">Create Blog</Link>
          </Button>
        </div>
      </header>
    </main>
  )
}

BlogsListPage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
