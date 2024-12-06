import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '~/components/providers/axios-provider'
import { LogFormValues } from '~/pages/logs/create/forms'
import { LOGS_QK } from './query-key'
import { CreateLogResponse } from '~/types/log'
import { ErrorResponse } from '#sharedTypes/server-response'
import { userId } from '~/store/user-store'

type Props = LogFormValues & { challengeId: string }

export const useCreateLog = () => {
  const mutate = useMutation<CreateLogResponse, ErrorResponse, Props>({
    mutationKey: [LOGS_QK],
    mutationFn: async (data) => {
      const { challengeId, ...rest } = data
      return await axiosInstance.post(`/users/${userId}/challenges/${challengeId}/logs`, rest)
    },
  })

  return {
    createLog: mutate.mutateAsync,
    createLogIsLoading: mutate.isPending,
    createLogMutate: mutate,
  }
}
