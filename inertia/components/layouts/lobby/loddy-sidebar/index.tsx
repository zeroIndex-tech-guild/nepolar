import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '~/components/ui/sidebar'

export const LobbySidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>Nepolar</SidebarHeader>
      <SidebarContent>
        <SidebarGroup></SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
