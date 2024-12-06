import { Gauge, Newspaper, Swords } from 'lucide-react'
import { userId } from '~/store/user-store'

export const dashboardSidebarItems = [
  {
    label: 'ViewPoints',
    points: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        Icon: Gauge,
      },
      {
        title: 'Challenges',
        url: '/challenges',
        Icon: Swords,
      },
      {
        title: 'Blogs',
        url: `${userId}/blogs`,
        Icon: Newspaper,
      },
    ],
  },
]
