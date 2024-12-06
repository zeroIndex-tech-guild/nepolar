import { MutationFunction, useMutation } from '@tanstack/react-query'
import { axiosInstance } from '~/components/providers/axios-provider'
import { toast } from 'sonner'
import { SuccessResponse } from '#sharedTypes/server-response'
import { User } from '~/types/user'
import { LoginResponse } from '~/types/auth'
import { router } from '@inertiajs/react'
import { TLoginValues } from '../form'
import { useUserStore } from '~/store/user-store'

const login: MutationFunction<SuccessResponse<{ user: User }>> = async (data) =>
  axiosInstance.post('auth/login', data)

export const useLogin = () => {
  const { setUser } = useUserStore()

  const loginMutation = useMutation<LoginResponse, Error, TLoginValues>({
    mutationKey: ['login'],
    mutationFn: login,
    onSuccess: (data) => {
      const user = data.data.user
      toast.success(data.message)
      setUser(user)
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
