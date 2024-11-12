import { DashboardLayout } from '~/components/layouts/dashboard'

export default function ChallengePage(props) {
  console.log({ props })
  return <h1>helo world</h1>
}

ChallengePage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
