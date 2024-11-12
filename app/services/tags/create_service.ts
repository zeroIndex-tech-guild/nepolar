import Tag from '#models/tag'
import { TCreateTag } from '#validators/tags/create'

export class TagsService {
  async create(payload: TCreateTag) {
    try {
      const newTag = await Tag.create(payload)
      return newTag
    } catch (error) {
      return null
    }
  }
}
