import { SidebarProvider } from '~/components/ui/sidebar'
import { DashboardSidebar } from '../dashboard-sidebar'
import { NepolarCrumb } from '~/components/ui/nepolarcrumb'

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="container mx-auto p-12 flex-1 flex flex-col gap-6">
        <NepolarCrumb />
        {children}
      </div>
    </SidebarProvider>
  )
}
