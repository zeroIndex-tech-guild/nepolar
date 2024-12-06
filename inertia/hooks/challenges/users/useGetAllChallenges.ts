import { useQuery } from '@tanstack/react-query'
import { CHALLENGES_QK } from './query-key'
import { axiosInstance } from '~/components/providers/axios-provider'
import queryString from 'query-string'
import { userId } from '~/store/user-store'

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
    queryKey: [CHALLENGES_QK, currentPageNo, limitPerPage],
    queryFn: async () => {
      const url = `/users/${userId}/challenges?${qs}`
      return await axiosInstance.get(url)
    },
  })

  return {
    challenges,
    isChallengesLoading,
  }
}
