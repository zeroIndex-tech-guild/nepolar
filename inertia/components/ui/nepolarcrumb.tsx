import { Link, usePage } from '@inertiajs/react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'
import { cn } from '~/lib/utils'

type CrumbItem = {
  label: string
  href: string
  disabled: boolean
}

const IGNORED_PATHS = ['dashboard']

export const NepolarCrumb = () => {
  const { url } = usePage()
  console.log({ url })
  const paths = url.split('/').filter(Boolean)

  if (IGNORED_PATHS.includes(paths[0])) {
    return <></>
  }

  const crumbs: CrumbItem[] = paths.map((path, index) => ({
    label: path,
    href: '/' + paths.slice(0, index + 1).join('/'),
    disabled: index === paths.length - 1,
  }))

  const crumbItems = crumbs.map(({ label, href, disabled }, index) => (
    <>
      <BreadcrumbItem key={label}>
        <BreadcrumbLink asChild>
          <Link
            href={href}
            disabled={disabled}
            className={cn('capitalize', href === url && 'text-gray-100')}
          >
            {label}
          </Link>
        </BreadcrumbLink>
      </BreadcrumbItem>

      {index < crumbs.length - 1 && <BreadcrumbSeparator />}
    </>
  ))

  return (
    <Breadcrumb>
      <BreadcrumbList>{crumbItems}</BreadcrumbList>
    </Breadcrumb>
  )
}
