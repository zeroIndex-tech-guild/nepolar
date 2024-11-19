import { FieldsGenerator } from '~/components/form-builder'
import { DashboardLayout } from '~/components/layouts/dashboard'
import { Form } from '~/components/ui/form'
import { challengeFormFields, ChallengeFormValues, defaultValues, resolver } from './forms'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { router } from '@inertiajs/react'
import { useCreateChallenge } from '~/hooks/challenges/useCreateChallenge'
import { Challenge } from '~/types/challenge'
import { userUpdateChallenge } from '~/hooks/challenges/useUpdateChallenge'

type PageProps = {
  challenge: Challenge
  isEditPage: boolean
}

export default function SingleChallengePage(props: PageProps) {
  const { challenge, isEditPage } = props

  const form = useForm({
    defaultValues: isEditPage
      ? {
          ...challenge,
          tags: [],
        }
      : defaultValues,
    resolver,
  })

  const { createChallenge, createChallengeIsLoading } = useCreateChallenge()
  const { updateChallenge, updateChallengeIsLoading } = userUpdateChallenge(challenge.id || '')

  const buttonLabel = isEditPage ? 'Update Challenge' : 'Create Challenge'

  const onSubmitHandler: SubmitHandler<ChallengeFormValues> = async (data) => {
    if (isEditPage) {
      const response = await updateChallenge(data, {
        onError: (error) => {
          console.log(error)
        },
        onSuccess: (data) => {
          console.log({ data })
        },
      })
      console.log({ response })
    }

    const response = await createChallenge(data, {
      onError: (error) => {
        console.log(error)
      },
      onSuccess: (data) => {
        console.log({ data })
      },
    })

    console.log({ response })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)}>
          <FieldsGenerator fields={challengeFormFields} form={form} />
          <Button>{buttonLabel}</Button>
        </form>
      </Form>
    </div>
  )
}

SingleChallengePage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
