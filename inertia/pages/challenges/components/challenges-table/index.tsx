import { ColumnDef, Row } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { DataTable } from '~/components/ui/data-table'
import { formatDate } from '~/lib/date-format'
import { Challenge } from '~/types/challenge'
import { router } from '@inertiajs/react'

type Props = {
  data: Challenge[]
}

const columns: ColumnDef<Challenge>[] = [
  {
    header: 'S.N.',
    cell: (info) => info.row.index + 1,
  },
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Days',
    accessorKey: 'days',
  },
  {
    header: 'Start Date',
    accessorKey: 'createdAt',
    cell: (info) => {
      const createdAt = info.getValue() as Date
      return formatDate(createdAt)
    },
  },
  {
    header: 'End Date',
    cell: (info) => {
      const { createdAt, days } = info.row.original
      const endDate = dayjs(createdAt).add(days, 'day').toDate()
      return formatDate(endDate)
    },
  },
]

export const ChallengesTable = (props: Props) => {
  const { data = [] } = props

  const onRowClick = (row: Row<Challenge>) => {
    const route = `/challenges/${row.original.id}`
    router.get(route)
  }

  return (
    <DataTable
      data={data}
      columns={columns}
      filter="name"
      filterPlaceholder="Search Challenges"
      onRowClick={onRowClick}
    />
  )
}
