import { MutationFunction, useMutation } from '@tanstack/react-query'
import { axiosInstance } from '~/components/providers/axios-provider'
import { TLoginValues } from '../form'
import { router } from '@inertiajs/react'
import { toast } from 'sonner'
import { ErrorResponse, SuccessResponse } from '#sharedTypes/server-response'
import { User } from '~/types/user'

const login: MutationFunction<SuccessResponse<{ user: User }>> = (data) => {
  return axiosInstance.post('auth/login', data)
}

export const useLogin = () => {
  const loginMutation = useMutation<SuccessResponse<{ user: User }>, ErrorResponse, TLoginValues>({
    mutationKey: ['login'],
    mutationFn: login,
    onSuccess: (data) => {
      toast.success(data.message)
      router.replace('/dashboard')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return {
    login: loginMutation.mutateAsync,
    isLoggingIng: loginMutation.isPending,
  }
}
