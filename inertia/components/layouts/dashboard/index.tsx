import { SidebarInset, SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'
import { DashboardSidebar } from '../dashboard-sidebar'

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div>{children}</div>
    </SidebarProvider>
  )
}
