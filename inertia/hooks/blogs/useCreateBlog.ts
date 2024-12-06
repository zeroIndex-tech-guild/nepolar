import { ErrorResponse } from '#sharedTypes/server-response'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '~/components/providers/axios-provider'
import { BlogFormValues } from '~/pages/blogs/create/forms'
import { useUserStore } from '~/store/user-store'
import { CreateBlogResponse } from '~/types/blog'

export const useCreateBlog = () => {
  const { id } = useUserStore()
  const mutate = useMutation<CreateBlogResponse, ErrorResponse, BlogFormValues>({
    mutationKey: ['create-blog'],
    mutationFn: async (data) => {
      const url = `${id}/blogs`
      return axiosInstance.post(url, data)
    },
  })

  return {
    createBlog: mutate.mutateAsync,
    isCreatingBlog: mutate.isPending,
    mutate,
  }
}
