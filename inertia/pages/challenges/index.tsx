import { DashboardLayout } from '~/components/layouts/dashboard'

type Props = {}

export default function ChallengePage(props: Props) {
  console.log({ props })
  return <h1>helo world of challenge</h1>
}

ChallengePage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
