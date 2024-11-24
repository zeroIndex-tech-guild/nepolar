import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '~/components/providers/axios-provider'
import { LogFormValues } from '~/pages/logs/create/forms'
import { LOGS_QK } from './query-key'

export const useCreateLog = () => {
  const mutate = useMutation({
    mutationKey: [LOGS_QK],
    mutationFn: async (data: LogFormValues & { challengeId: number }) => {
      const { challengeId, ...rest } = data
      return await axiosInstance.post(`/challenges/${challengeId}/logs`, rest)
    },
  })

  return {
    createLog: mutate.mutateAsync,
    createLogIsLoading: mutate.isPending,
    createLogMutate: mutate,
  }
}
