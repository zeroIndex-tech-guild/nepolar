import { Link } from '@inertiajs/react'
import { DashboardLayout } from '~/components/layouts/dashboard'
import { Button } from '~/components/ui/button'
import { Typography } from '~/components/ui/typography'

export default function BlogsListPage() {
  return (
    <main>
      <header>
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
