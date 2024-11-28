import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '~/components/providers/axios-provider'
import { LOGS_QK } from './query-key'
import { DeleteLogResponse } from '~/types/log'
import { ErrorResponse } from '#sharedTypes/server-response'

type Props = {
  challengeId: string
  logId: string
}

export const useDeleteLog = () => {
  const mutate = useMutation<DeleteLogResponse, ErrorResponse, Props>({
    mutationKey: [LOGS_QK],
    mutationFn: async ({ challengeId, logId }) =>
      await axiosInstance.delete(`/challenges/${challengeId}/logs/${logId}`),
  })

  return {
    deleteLog: mutate.mutateAsync,
    isDeletingLog: mutate.isPending,
    deleteLogMutate: mutate,
  }
}
