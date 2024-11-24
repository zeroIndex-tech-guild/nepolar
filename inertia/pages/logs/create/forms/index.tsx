import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Field } from '~/components/form-builder'

export const logFormFields: Field[] = [
  {
    name: 'content',
    label: 'Content',
    type: 'mdx',
    placeholder: 'Content',
    required: true,
  },
]

const logFormSchema = z.object({
  content: z.string().min(1, { message: 'Please enter some content...' }),
})

export const defaultValues = {
  content: '',
}

export const resolver = zodResolver(logFormSchema)

export type LogFormValues = z.infer<typeof logFormSchema>
