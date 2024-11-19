import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '~/components/providers/axios-provider'
import { TChallengeForm } from '~/pages/challenges/create/forms'
import { CHALLENGES_QK } from './query-key'

export const useCreateChallenge = () => {
  const mutate = useMutation({
    mutationKey: [CHALLENGES_QK],
    mutationFn: async (data: TChallengeForm) => {
      return await axiosInstance.post('/challenges', data)
    },
  })

  return {
    createChallenge: mutate.mutateAsync,
    createChallengeIsLoading: mutate.isPending,
    createChallengeMutate: mutate,
  }
}
