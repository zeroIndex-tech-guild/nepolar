import { ErrorResponse, SuccessResponse } from '#sharedTypes/server-response'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '~/components/providers/axios-provider'

type Success = SuccessResponse<{
  url: string
}>
export const useUploadMdxImage = () => {
  const mutate = useMutation<Success, ErrorResponse, File>({
    mutationKey: ['uploadMdxImage'],
    mutationFn: async (image) => {
      const formData = new FormData()
      formData.append('image', image)

      return axiosInstance.post('/uploads/mdx-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
  })

  return {
    isUploadingImage: mutate.isPending,
    uploadMdxImage: mutate.mutateAsync,
    mutate,
  }
}
