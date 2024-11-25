import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '~/components/providers/axios-provider'
import { TLoginValues } from '../form'

export const useLogin = () => {
  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: async (signupData: TLoginValues) => {
      const response = await axiosInstance.post('auth/login', signupData)
      return {
        success: true,
        message: 'User Logged In successfully',
        data: response.data,
        error: null,
      }
    },
  })

  return {
    login: login.mutateAsync,
  }
}
