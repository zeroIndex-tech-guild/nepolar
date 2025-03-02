import { QueryProvider } from '~/components/providers/query-provider'
import { Toaster } from 'sonner'
import { ThemeProvider } from '~/components/providers/theme-providres'
import { AxiosProvider } from '~/components/providers/axios-provider'

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AxiosProvider>
        <QueryProvider>
          <ThemeProvider defaultTheme="dark" storageKey="nepolarTheme">
            <Toaster richColors />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </AxiosProvider>
    </>
  )
}
