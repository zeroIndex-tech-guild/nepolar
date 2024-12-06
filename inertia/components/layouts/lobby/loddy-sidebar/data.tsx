import { Gauge, Home, Newspaper, ScrollText, Swords } from 'lucide-react'

export const lobbySidebarItems = [
  {
    label: 'Nepolar',
    points: [
      {
        title: 'Home',
        url: '/',
        Icon: Home,
      },
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
        title: 'Logs',
        url: '/logs',
        Icon: ScrollText,
      },
      {
        title: 'Blogs',
        url: '/blogs',
        Icon: Newspaper,
      },
    ],
  },
]
