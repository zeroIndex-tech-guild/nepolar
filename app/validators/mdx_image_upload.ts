import vine from '@vinejs/vine'

export const mdxImageUploadValidator = vine.compile(
  vine.object({
    image: vine.file({
      size: '5mb',
    }),
  })
)
