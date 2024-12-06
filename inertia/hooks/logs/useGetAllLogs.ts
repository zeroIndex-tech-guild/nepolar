import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '~/components/providers/axios-provider'
import queryString from 'query-string'
import { PaginationProps } from '~/types/pagination-meta'
import { LOBBY_LOGS_QK } from './query_key'

type Props = {
  challengeId: string
} & PaginationProps

export const useGetAllLogs = (props: Props) => {
  const { page, limit, orderBy = 'desc' } = props

  const qs = queryString.stringify({
    page,
    limit,
    orderBy,
  })

  const { data: challenges, isLoading: isChallengesLoading } = useQuery({
    queryKey: [LOBBY_LOGS_QK, page, limit, orderBy],
    queryFn: async () => {
      const url = `/challenges?${qs}`
      return await axiosInstance.get(url)
    },
  })

  return {
    challenges,
    isChallengesLoading,
  }
}
