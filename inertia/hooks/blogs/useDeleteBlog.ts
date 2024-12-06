import { ErrorResponse } from '#sharedTypes/server-response'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '~/components/providers/axios-provider'

export const useDeleteBlog = () => {
  const mutate = useMutation<string, ErrorResponse, string>({
    mutationKey: ['delete-blog'],
    mutationFn: async (id: string) => {
      return axiosInstance.delete(`/blogs/${id}`)
    },
  })

  return {
    deleteBlog: mutate.mutateAsync,
    isDeletingBlog: mutate.isPending,
    deleteBlogMutate: mutate,
  }
}
