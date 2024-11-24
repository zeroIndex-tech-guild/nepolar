import { cn } from '~/lib/utils'

type TypographyProps = {
  children: React.ReactNode
  className?: string
}

export const Typography = () => {}

Typography.H1 = ({ children, className }: TypographyProps) => {
  return (
    <h1 className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)}>
      {children}
    </h1>
  )
}

Typography.H2 = ({ children, className }: TypographyProps) => {
  return (
    <h2
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className
      )}
    >
      {children}
    </h2>
  )
}

Typography.H3 = ({ children, className }: TypographyProps) => {
  return (
    <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)}>
      {children}
    </h3>
  )
}

Typography.H4 = ({ children, className }: TypographyProps) => {
  return (
    <h4 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)}>
      {children}
    </h4>
  )
}

Typography.P = ({ children, className }: TypographyProps) => {
  return <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>{children}</p>
}

Typography.Lead = ({ children, className }: TypographyProps) => {
  return <p className={cn('text-xl text-muted-foreground', className)}>{children}</p>
}

Typography.Large = ({ children, className }: TypographyProps) => {
  return <p className={cn('text-lg font-semibold', className)}>{children}</p>
}

Typography.Small = ({ children, className }: TypographyProps) => {
  return <p className={cn('text-sm font-medium leading-none', className)}>{children}</p>
}

Typography.Muted = ({ children, className }: TypographyProps) => {
  return <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>
}
