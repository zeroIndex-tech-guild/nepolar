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
    type: 'custom',
    name: 'tags',
    render: (field) => {
      return <div>Tags</div>
    },
  },
]

const challengeFormSchema = z.object({
  name: z.string().min(1, { message: 'Challenge Name is required' }),
  days: z.string(),
  tags: z.array(z.string()),
})

export const defaultValues = {
  name: '',
  days: 0,
  tags: [],
}

export const resolver = zodResolver(challengeFormSchema)

export type TChallengeForm = z.infer<typeof challengeFormSchema>
