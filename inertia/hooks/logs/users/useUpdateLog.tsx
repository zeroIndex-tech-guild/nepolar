import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '~/components/providers/axios-provider'
import { LogFormValues } from '~/pages/logs/create/forms'
import { LOGS_QK } from './query-key'
import { UpdateLogResponse } from '~/types/log'
import { ErrorResponse } from '#sharedTypes/server-response'
import { userId } from '~/store/user-store'

type Props = LogFormValues & { challengeId: string; logId: string }

export const useUpdateLog = () => {
  const mutate = useMutation<UpdateLogResponse, ErrorResponse, Props>({
    mutationKey: [LOGS_QK],
    mutationFn: async (data) => {
      const { challengeId, logId, ...rest } = data
      return await axiosInstance.put(
        `/users/${userId}/challenges/${challengeId}/logs/${logId}`,
        rest
      )
    },
  })

  return {
    updateLog: mutate.mutateAsync,
    updateLogIsLoading: mutate.isPending,
    updateLogMutate: mutate,
  }
}
