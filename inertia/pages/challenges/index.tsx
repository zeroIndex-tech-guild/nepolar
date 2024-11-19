import { DashboardLayout } from '~/components/layouts/dashboard'
import { useGetChallenges } from '~/hooks/challenges/useGetAllChallenges'

type Props = {}

export default function ChallengePage(props: Props) {
  const {} = useGetChallenges({
    currentPageNo: 1,
    limitPerPage: 10,
  })
  console.log({ props })
  return <h1>helo world of challenge</h1>
}

ChallengePage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
