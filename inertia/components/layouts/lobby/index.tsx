import { SidebarProvider } from '~/components/ui/sidebar'
import { LobbySidebar } from './loddy-sidebar'

export const LobbyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex gap-8">
        <LobbySidebar />

        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  )
}
