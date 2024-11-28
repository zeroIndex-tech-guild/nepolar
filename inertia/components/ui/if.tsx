export const IF = ({ condition, children }: { condition: unknown; children: React.ReactNode }) => {
  return <>{Boolean(condition) ? <>{children}</> : null}</>
}
