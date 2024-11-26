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
import { Link, usePage } from '@inertiajs/react'
import { cn } from '~/lib/utils'

export const DashboardSidebar = () => {
  const { url: pageUrl } = usePage()

  return (
    <Sidebar>
      <SidebarHeader>
        <h1>Nepolar</h1>
      </SidebarHeader>

      <SidebarContent>
        {dashboardSidebarItems.map((sidebarItem) => {
          const { label, points } = sidebarItem

          return (
            <SidebarGroup key={label}>
              <SidebarGroupLabel className="text-base">{label}</SidebarGroupLabel>

              <SidebarContent>
                <SidebarMenu>
                  {points.map((point) => {
                    const { url, title, Icon } = point
                    const isActive = url === pageUrl
                    return (
                      <SidebarMenuItem key={url}>
                        <Link
                          href={url}
                          className={cn(
                            'flex items-center gap-2 text-md hover:bg-purple-800  p-2 rounded-md',
                            isActive && 'bg-purple-800'
                          )}
                        >
                          {<Icon size={16} />}
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
