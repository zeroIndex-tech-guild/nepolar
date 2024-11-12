import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { axiosInstance } from '~/components/providers/axios-provider'
import { TLoginValues } from '../form'

export const useLogin = () => {
  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: async (signupData: TLoginValues) => {
      try {
        const response = await axiosInstance.post('auth/login', signupData)
        return {
          success: true,
          message: 'User Logged In successfully',
          data: response.data,
          error: null,
        }
      } catch (e) {
        if (e instanceof AxiosError) {
          return {
            success: false,
            error: {
              message: e.response?.data.message,
            },
            message: 'Failed to login user',
            data: null,
          }
        }
        console.log({ e })
      }
    },
  })

  return {
    login: login.mutateAsync,
  }
}
