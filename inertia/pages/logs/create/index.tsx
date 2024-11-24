import { SubmitHandler, useForm } from 'react-hook-form'
import { FieldsGenerator } from '~/components/form-builder'
import { DashboardLayout } from '~/components/layouts/dashboard'
import { Form } from '~/components/ui/form'
import { Typography } from '~/components/ui/typography'
import { defaultValues, resolver, logFormFields, LogFormValues } from './forms'
import { Button, LoadingButton } from '~/components/ui/button'
import { useCreateLog } from '~/hooks/logs/useCreateLog'
import { toast } from 'sonner'
import { router } from '@inertiajs/react'

type Props = {
  challengeId: number
}

export default function LogCreationUpdatePage(props: Props) {
  const { challengeId } = props

  const form = useForm({
    defaultValues,
    resolver,
  })
  const { createLog, createLogIsLoading } = useCreateLog()

  const onSubmitHandler: SubmitHandler<LogFormValues> = async (formData) => {
    await createLog(
      {
        ...formData,
        challengeId,
      },
      {
        onSuccess: () => {
          toast.success('Log created successfully')
          router.get(`/challenges/${challengeId}/logs`)
        },
        onError: () => {
          toast.error('Failed to create log')
        },
      }
    )
  }

  return (
    <div>
      <Typography.H1>Log Creation</Typography.H1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)}>
          <FieldsGenerator fields={logFormFields} form={form} />

          <div>
            <LoadingButton type="submit" isLoading={createLogIsLoading}>
              Add a new log
            </LoadingButton>
            <Button variant={'outline'}>Save as Draft</Button>
            <Button variant={'outline'}>Cancel</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

LogCreationUpdatePage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
