import { FieldsGenerator } from '~/components/form-builder'
import { DashboardLayout } from '~/components/layouts/dashboard'
import { Form } from '~/components/ui/form'
import { challengeFormFields, ChallengeFormValues, defaultValues, resolver } from './forms'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoadingButton } from '~/components/ui/button'
import { router } from '@inertiajs/react'
import { useCreateChallenge } from '~/hooks/challenges/useCreateChallenge'
import { Challenge } from '~/types/challenge'
import { userUpdateChallenge } from '~/hooks/challenges/useUpdateChallenge'
import { toast } from 'sonner'
import { DeleteChallengeAlert } from '../components/delete-challenge-alert'

type PageProps = {
  challenge: Challenge
  isEditPage: boolean
  challengeId: string
}

export default function SingleChallengePage(props: PageProps) {
  const { challenge, isEditPage, challengeId } = props

  const form = useForm({
    defaultValues: isEditPage
      ? {
          ...challenge,
          tags: challenge.tags.map((tag) => tag.name),
        }
      : defaultValues,
    resolver,
  })

  const { createChallenge, createChallengeIsLoading } = useCreateChallenge()
  const { updateChallenge, updateChallengeIsLoading } = userUpdateChallenge(challenge?.id || '')

  const buttonLabel = isEditPage ? 'Update Challenge' : 'Create Challenge'

  const onSubmitHandler: SubmitHandler<ChallengeFormValues> = async (data) => {
    if (isEditPage) {
      await updateChallenge(data, {
        onError: () => {
          toast.error('Something went wrong. Please try again.')
        },
        onSuccess: () => {
          toast.success('Challenge updated successfully.')
        },
      })

      return
    }

    await createChallenge(data, {
      onError: () => {
        toast.error('Something went wrong. Please try again.')
      },
      onSuccess: (data) => {
        toast.success('Challenge created successfully.')
        router.visit(`/challenges/${data.data.challenge.id}`)
      },
    })
  }

  const isLoading = updateChallengeIsLoading || createChallengeIsLoading

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)} className="flex flex-col gap-4">
          <FieldsGenerator fields={challengeFormFields} form={form} />
          <div className="flex gap-4 items-center">
            <LoadingButton isLoading={isLoading}>{buttonLabel}</LoadingButton>

            {isEditPage && <DeleteChallengeAlert challengeId={challengeId} />}
          </div>
        </form>
      </Form>
    </div>
  )
}

SingleChallengePage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
