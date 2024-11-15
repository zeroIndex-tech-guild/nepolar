import { useMutation } from '@tanstack/react-query'
import { TChallengeForm } from '../forms'
import { axiosInstance } from '~/components/providers/axios-provider'

export const useCreateChallenge = () => {
  const mutate = useMutation({
    mutationKey: ['challenges'],
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
