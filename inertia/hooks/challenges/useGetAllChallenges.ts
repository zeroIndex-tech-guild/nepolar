import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '~/components/providers/axios-provider'
import queryString from 'query-string'
import { LOBBY_CHALLENGES } from './query_key'

type Props = {
  currentPageNo: number
  limitPerPage: number
  orderBy?: 'desc' | 'asc'
}

export const useGetAllChallenges = (props: Props) => {
  const { currentPageNo, limitPerPage, orderBy = 'desc' } = props

  const qs = queryString.stringify({
    page: currentPageNo,
    limit: limitPerPage,
    orderBy,
  })

  const { data: challenges, isLoading: isChallengesLoading } = useQuery({
    queryKey: [LOBBY_CHALLENGES, currentPageNo, limitPerPage, orderBy],
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
