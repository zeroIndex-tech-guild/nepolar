import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import { QueryProvider } from '~/components/providers/query-provider'
import { Toaster } from 'sonner'
import { ThemeProvider } from '~/components/providers/theme-providres'
import { AxiosProvider } from '~/components/providers/axios-provider'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
      return pages[`../pages/${name}.tsx`]
    },
    setup: ({ App, props }) => (
      <AxiosProvider>
        <QueryProvider>
          <ThemeProvider defaultTheme="dark" storageKey="gnepolarTheme">
            <Toaster richColors />
            <App {...props} />
          </ThemeProvider>
        </QueryProvider>
      </AxiosProvider>
    ),
  })
}
