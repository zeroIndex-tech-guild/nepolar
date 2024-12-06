import { Gauge, Newspaper, Swords } from 'lucide-react'

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
        url: '/blogs',
        Icon: Newspaper,
      },
    ],
  },
]
