import { loginValidator } from '#validators/auth/login'
import { registrationValidator } from '#validators/auth/register'
import { Infer } from '@vinejs/vine/types'

export type RegistrationData = Infer<typeof registrationValidator>

export type LoginData = Infer<typeof loginValidator>
