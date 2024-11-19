import vine from '@vinejs/vine'

export const registrationValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(8),
    userName: vine.string().minLength(3),
    confirmPassword: vine.string().minLength(8),
    fullName: vine.string(),
  })
)
