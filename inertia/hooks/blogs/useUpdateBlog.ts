import { ErrorResponse } from '#sharedTypes/server-response'
import { router } from '@inertiajs/react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { axiosInstance } from '~/components/providers/axios-provider'
import { BlogFormValues } from '~/pages/blogs/create/forms'
import { UpdateBlogResponse } from '~/types/blog'

export const useUpdateBlog = (blogId: string) => {
  const mutate = useMutation<UpdateBlogResponse, ErrorResponse, BlogFormValues>({
    mutationKey: ['update-blog'],
    mutationFn: async (data) => {
      return await axiosInstance.put(`/blogs/${blogId}`, data)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      router.get(`/blogs/${blogId}`)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return {
    updateBlog: mutate.mutateAsync,
    isUpdatingBlog: mutate.isPending,
    mutate,
  }
}
