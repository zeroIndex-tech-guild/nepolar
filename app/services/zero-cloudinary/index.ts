import { zeroCloudinary } from '#config/cloudinary'
import { UploadApiOptions } from 'cloudinary'
import logger from '@adonisjs/core/services/logger'
import { makeRandomId } from '#shared/utils'

/*
 * A base service to handle cloudinary operations
 * base method to upload image
 */
export default class ZeroCloudinaryService {
  async mdxImageUpload(filePath: string, uploadConfig: UploadApiOptions = {}) {
    try {
      const id = makeRandomId()
      const uploadResult = await zeroCloudinary.uploader.upload(filePath, {
        ...uploadConfig,
        public_id: id,
      })

      return {
        data: { url: uploadResult.url },
        error: null,
      }
    } catch (e) {
      logger.error(e)
      return {
        data: null,
        error: (e as Error).message,
      }
    }
  }
}
