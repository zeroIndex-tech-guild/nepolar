import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '~/components/providers/axios-provider'
import { LogFormValues } from '~/pages/logs/create/forms'
import { LOGS_QK } from './query-key'

export const useUpdateLog = (logId = '') => {
  const mutate = useMutation({
    mutationKey: [LOGS_QK, logId],
    mutationFn: async (data: LogFormValues & { challengeId: number }) => {
      const { challengeId, ...rest } = data
      return await axiosInstance.put(`/challenges/${challengeId}/logs/${logId}`, rest)
    },
  })

  return {
    updateLog: mutate.mutateAsync,
    updateLogIsLoading: mutate.isPending,
    updateLogMutate: mutate,
  }
}
