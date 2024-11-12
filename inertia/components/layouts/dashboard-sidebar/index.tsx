import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '~/components/ui/sidebar'
import { dashboardSidebarItems } from './data'
import { Link } from '@inertiajs/react'

export const DashboardSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1>Nepolar</h1>
      </SidebarHeader>

      <SidebarContent>
        {dashboardSidebarItems.map((sidebarItem) => {
          const { label, points } = sidebarItem

          return (
            <SidebarGroup>
              <SidebarGroupLabel>{label}</SidebarGroupLabel>

              <SidebarContent>
                <SidebarMenu>
                  {points.map((point) => {
                    const { url, title, Icon } = point
                    return (
                      <SidebarMenuItem>
                        <Link href={url} className="">
                          {<Icon />}
                          {title}
                        </Link>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarContent>
            </SidebarGroup>
          )
        })}
      </SidebarContent>

      <SidebarFooter>Settings</SidebarFooter>
    </Sidebar>
  )
}
