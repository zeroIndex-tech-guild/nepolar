import { Field } from '~/components/form-builder'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const loginFields: Field[] = [
  {
    name: 'email',
    type: 'text',
    label: 'Email',
    placeholder: 'nepali@nepolar.com',
    colSpan: 6,
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: '********',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: '********',
  },
]

export const defaultValues = {
  email: '',
  password: '',
}

const ZLoginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
})

export const resolver = zodResolver(ZLoginSchema)

/*
 * TLoginValues represents the type of the values passed to the login form.
 */
export type TLoginValues = z.infer<typeof ZLoginSchema>
