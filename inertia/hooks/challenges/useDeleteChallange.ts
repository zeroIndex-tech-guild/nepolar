import { useMutation } from '@tanstack/react-query'
import { CHALLENGES_QK } from './query-key'
import { axiosInstance } from '~/components/providers/axios-provider'

export const useDeleteChallenge = () => {
  const mutate = useMutation({
    mutationKey: [CHALLENGES_QK],
    mutationFn: async (challengeId: string) => {
      return await axiosInstance.delete('/challenges/' + challengeId)
    },
  })

  return {
    deleteChallenge: mutate.mutateAsync,
    deleteChallengeIsLoading: mutate.isPending,
    deleteChallengeMutate: mutate,
  }
}
