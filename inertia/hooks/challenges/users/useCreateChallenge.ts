import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '~/components/providers/axios-provider'
import { ChallengeFormValues } from '~/pages/challenges/create/forms'
import { CHALLENGES_QK } from './query-key'
import { CreateChallengeResponse } from '~/types/challenge'
import { ErrorResponse } from '#sharedTypes/server-response'
import { userId } from '~/store/user-store'

export const useCreateChallenge = () => {
  const mutate = useMutation<CreateChallengeResponse, ErrorResponse, ChallengeFormValues>({
    mutationKey: [CHALLENGES_QK],
    mutationFn: async (data) => await axiosInstance.post(`/users/${userId}/challenges`, data),
  })

  return {
    createChallenge: mutate.mutateAsync,
    createChallengeIsLoading: mutate.isPending,
    createChallengeMutate: mutate,
  }
}
