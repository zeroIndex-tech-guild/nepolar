import { useMutation } from '@tanstack/react-query'
import { CHALLENGES_QK } from './query-key'
import { axiosInstance } from '~/components/providers/axios-provider'
import { ErrorResponse } from '#sharedTypes/server-response'

export const useDeleteChallenge = () => {
  const mutate = useMutation<string, ErrorResponse, string>({
    mutationKey: [CHALLENGES_QK],
    mutationFn: async (challengeId) => await axiosInstance.delete('/challenges/' + challengeId),
  })

  return {
    deleteChallenge: mutate.mutateAsync,
    deleteChallengeIsLoading: mutate.isPending,
    deleteChallengeMutate: mutate,
  }
}
