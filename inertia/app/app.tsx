/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css'
import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { QueryProvider } from '~/components/providers/query-provider'
import { Toaster } from 'sonner'
import { ThemeProvider } from '~/components/providers/theme-providres'
import { AxiosProvider } from '~/components/providers/axios-provider'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    return resolvePageComponent(`../pages/${name}.tsx`, import.meta.glob('../pages/**/*.tsx'))
  },

  setup({ el, App, props }) {
    hydrateRoot(
      el,

      <AxiosProvider>
        <QueryProvider>
          <ThemeProvider defaultTheme="dark" storageKey="nepolarTheme">
            <Toaster richColors />
            <App {...props} />
          </ThemeProvider>
        </QueryProvider>
      </AxiosProvider>
    )
  },
})
