import { DashboardLayout } from '~/components/layouts/dashboard'

export default function ChallengeDetailPage() {
  return <div>ChallengeDetailPage</div>
}

ChallengeDetailPage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
