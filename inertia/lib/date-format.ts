export const formatDate = (data: Date) => {
  const d = new Date(data)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
