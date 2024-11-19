import { SidebarProvider } from '~/components/ui/sidebar'
import { DashboardSidebar } from '../dashboard-sidebar'

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      {children}
    </SidebarProvider>
  )
}
