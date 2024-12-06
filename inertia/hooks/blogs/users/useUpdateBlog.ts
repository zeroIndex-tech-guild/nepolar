import { ErrorResponse } from '#sharedTypes/server-response'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '~/components/providers/axios-provider'
import { BlogFormValues } from '~/pages/blogs/create/forms'
import { userId } from '~/store/user-store'
import { UpdateBlogResponse } from '~/types/blog'

export const useUpdateBlog = (blogId: string) => {
  const mutate = useMutation<UpdateBlogResponse, ErrorResponse, BlogFormValues>({
    mutationKey: ['update-blog'],
    mutationFn: async (data) => {
      return await axiosInstance.put(`/users/${userId}/blogs/${blogId}`, data)
    },
  })

  return {
    updateBlog: mutate.mutateAsync,
    isUpdatingBlog: mutate.isPending,
    mutate,
  }
}
