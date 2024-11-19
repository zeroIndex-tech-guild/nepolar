import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import { QueryProvider } from '~/components/providers/query-provider'
import { Toaster } from 'sonner'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
      return pages[`../pages/${name}.tsx`]
    },
    setup: ({ App, props }) => (
      <QueryProvider>
        <Toaster richColors />
        <App {...props} />
      </QueryProvider>
    ),
  })
}
