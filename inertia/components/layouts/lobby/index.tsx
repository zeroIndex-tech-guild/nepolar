import { SidebarProvider } from '~/components/ui/sidebar'
import { LobbySidebar } from './loddy-sidebar'
import { LobbyNavbar } from './navbar'

export const LobbyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <SidebarProvider>
        <div className="flex gap-8 flex-1">
          <LobbySidebar />

          <main className="flex-1 flex flex-col">
            <LobbyNavbar />
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}
