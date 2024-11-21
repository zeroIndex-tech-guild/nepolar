import { Field } from '~/components/form-builder'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const signupFields: Field[] = [
  {
    name: 'userName',
    type: 'text',
    label: 'Username',
    placeholder: 'nepolar',
  },
  {
    name: 'fullName',
    type: 'text',
    label: 'Full Name',
    placeholder: 'Uzumaki Naruto',
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'nepali@nepolar.com',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: '********',
  },
  {
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirm Password',
    placeholder: '********',
  },
]

const ZSignupSchema = z
  .object({
    userName: z.string().min(1, {
      message: 'Please enter a username.',
    }),
    fullName: z.string().min(1, {
      message: 'Please enter your full name.',
    }),
    email: z.string().email({
      message: 'Please enter a valid email.',
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
    confirmPassword: z.string().min(8, {
      message: 'Confirm your password.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  })

export const defaultValues = {
  userName: '',
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export const resolver = zodResolver(ZSignupSchema)

export type TSignupValues = z.infer<typeof ZSignupSchema>
