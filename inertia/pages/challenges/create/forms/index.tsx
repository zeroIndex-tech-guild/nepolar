import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Field } from '~/components/form-builder'

export const challengeFormFields: Field[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: '30 Days of JavaScript',
    required: true,
  },
  {
    name: 'days',
    label: 'Days',
    type: 'number',
    placeholder: '30',
  },
  {
    label: 'Tags',
    type: 'tags-input',
    name: 'tags',
    placeholder: "Challenge's tags",
  },
  {
    type: 'mdx',
    name: 'description',
    label: 'Description',
    placeholder: 'Challenge description',
  },
]

const challengeFormSchema = z.object({
  name: z.string().min(1, { message: 'Challenge Name is required' }),
  days: z.coerce.number({
    invalid_type_error: 'Days must be a valid number',
  }),
  //days: z
  //  .string()
  //  .transform((val) => parseInt(val, 10))
  //  .refine((val) => !isNaN(val), { message: 'Days must be a valid number' }),
  tags: z.array(z.string(), { required_error: 'Tags are required' }),
  description: z.string().min(1, { message: 'Description is required' }),
})

export const defaultValues = {
  name: '',
  days: 0,
  tags: [] as string[],
  description: '',
}

export const resolver = zodResolver(challengeFormSchema)

export type ChallengeFormValues = z.infer<typeof challengeFormSchema>
