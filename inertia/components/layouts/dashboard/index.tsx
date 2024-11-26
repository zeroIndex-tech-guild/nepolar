import { SidebarProvider } from '~/components/ui/sidebar'
import { DashboardSidebar } from '../dashboard-sidebar'

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="container mx-auto p-12 flex-1">{children}</div>
    </SidebarProvider>
  )
}
