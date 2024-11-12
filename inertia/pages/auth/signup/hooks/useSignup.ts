import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { axiosInstance } from '~/components/providers/axios-provider'
import { TSignupValues } from '../form'

export const useSignup = () => {
  const signup = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (signupData: TSignupValues) => {
      try {
        const response = await axiosInstance.post('auth/signup', signupData)
        return {
          success: true,
          message: 'User created successfully',
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
            message: 'Failed to create user',
            data: null,
          }
        }
        console.log({ e })
      }
    },
  })

  return {
    signup: signup.mutateAsync,
  }
}
