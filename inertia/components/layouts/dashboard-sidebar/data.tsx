import { Gauge, Swords } from 'lucide-react'

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
    ],
  },
]
