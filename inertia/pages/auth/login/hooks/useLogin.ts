import { MutationFunction, useMutation } from '@tanstack/react-query'
import { axiosInstance } from '~/components/providers/axios-provider'
import { toast } from 'sonner'
import { SuccessResponse } from '#sharedTypes/server-response'
import { User } from '~/types/user'
import { LoginResponse } from '~/types/auth'
import { router } from '@inertiajs/react'

const login: MutationFunction<SuccessResponse<{ user: User }>> = (data) => {
  return axiosInstance.post('auth/login', data)
}

export const useLogin = () => {
  const loginMutation = useMutation<LoginResponse>({
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
