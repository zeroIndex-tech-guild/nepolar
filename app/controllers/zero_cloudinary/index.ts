import ZeroCloudinaryService from '#services/zero-cloudinary/index'
import { mdxImageUploadValidator } from '#validators/mdx_image_upload'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { StatusCodes } from 'http-status-codes'

@inject()
export default class ZeroCloudinaryController {
  constructor(protected zeroCloudinarService: ZeroCloudinaryService) {}

  async mdxImageUpload({ request }: HttpContext) {
    const { image } = await request.validateUsing(mdxImageUploadValidator)

    const { error, data } = await this.zeroCloudinarService.mdxImageUpload(image.tmpPath!)

    return {
      status: StatusCodes.OK,
      message: 'Uploaded successfully',
      error,
      data,
    }
  }
}
