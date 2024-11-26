import { MutationFunction, useMutation } from '@tanstack/react-query'
import { axiosInstance } from '~/components/providers/axios-provider'
import { ErrorResponse, SuccessResponse } from '#sharedTypes/server-response'
import { User } from '~/types/user'
import { TSignupValues } from '../form'
import { toast } from 'sonner'
import { router } from '@inertiajs/react'

const signup: MutationFunction<SuccessResponse<{ user: User }>> = (data) => {
  return axiosInstance.post('auth/signup', data)
}

export const useSignup = () => {
  const signupMutation = useMutation<SuccessResponse<{ user: User }>, ErrorResponse, TSignupValues>(
    {
      mutationKey: ['signup'],
      mutationFn: signup,
      onSuccess: (data) => {
        toast.success(data.message)
        router.get('/login')
      },
      onError: (error) => {
        console.log({ error })
      },
    }
  )

  return {
    signup: signupMutation.mutateAsync,
  }
}
