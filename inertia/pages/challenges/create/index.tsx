import { FieldsGenerator } from '~/components/form-builder'
import { DashboardLayout } from '~/components/layouts/dashboard'
import { Form } from '~/components/ui/form'
import { challengeFormFields, defaultValues, resolver, TChallengeForm } from './forms'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Link, router } from '@inertiajs/react'
import { useCreateChallenge } from '~/hooks/challenges/useCreateChallenge'

type PageProps = {
  params: {
    challengeId: string
  }
}
export default function SingleChallengePage(props: PageProps) {
  const form = useForm({
    defaultValues,
    resolver,
  })
  const { createChallenge } = useCreateChallenge()

  const onSubmitHandler = async (data: TChallengeForm) => {
    const response = await createChallenge(data, {
      onError: (error) => {
        router.replace('/login')
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
          <Button>Create Challenge</Button>
        </form>
      </Form>
    </div>
  )
}

SingleChallengePage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
