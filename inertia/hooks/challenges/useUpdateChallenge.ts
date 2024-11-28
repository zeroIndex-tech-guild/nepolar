import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '~/components/providers/axios-provider'
import { ChallengeFormValues } from '~/pages/challenges/create/forms'
import { CHALLENGES_QK } from './query-key'
import { UpdateChallengeResponse } from '~/types/challenge'
import { ErrorResponse } from '#sharedTypes/server-response'

export const userUpdateChallenge = (challengeId: string) => {
  const mutate = useMutation<UpdateChallengeResponse, ErrorResponse, ChallengeFormValues>({
    mutationKey: [CHALLENGES_QK],
    mutationFn: async (data) => await axiosInstance.put('/challenges/' + challengeId, data),
  })

  return {
    updateChallenge: mutate.mutateAsync,
    updateChallengeIsLoading: mutate.isPending,
    updateChallengeMutate: mutate,
  }
}
