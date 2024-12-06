import { Gauge, Newspaper, Swords } from 'lucide-react'

export const dashboardSidebarItems = [
  {
    label: 'ViewPoints',
    points: [
      {
        title: 'Lobby',
        url: '/',
        Icon: Gauge,
      },
      {
        title: 'Dashboard',
        url: '/dashboard',
        Icon: Gauge,
      },
      {
        title: 'Challenges',
        url: '/dashboard/challenges',
        Icon: Swords,
      },
      {
        title: 'Blogs',
        url: '/dashboard/blogs',
        Icon: Newspaper,
      },
    ],
  },
]
