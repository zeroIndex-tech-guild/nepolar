import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Field } from '~/components/form-builder'

export const formFields: Field[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    placeholder: 'Title',
    required: true,
  },
  {
    name: 'content',
    label: 'Content',
    type: 'mdx',
    placeholder: 'Content',
    required: true,
  },
]

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
})

export const defaultValues = {
  title: '',
  content: '',
}

export const resolver = zodResolver(blogSchema)

export type BlogFormValues = z.infer<typeof blogSchema>
