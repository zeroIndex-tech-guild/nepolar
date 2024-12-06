import { SubmitHandler, useForm } from 'react-hook-form'
import { FieldsGenerator } from '~/components/form-builder'
import { DashboardLayout } from '~/components/layouts/dashboard'
import { Form } from '~/components/ui/form'
import { Typography } from '~/components/ui/typography'
import { defaultValues, resolver, logFormFields, LogFormValues } from './forms'
import { Button, LoadingButton } from '~/components/ui/button'
import { useCreateLog } from '~/hooks/logs/users/useCreateLog'
import { toast } from 'sonner'
import { router } from '@inertiajs/react'
import { Log } from '~/types/log'
import { useUpdateLog } from '~/hooks/logs/users/useUpdateLog'
import { DeleteLogAlert } from '../components/delete-log-alert'

type Props = {
  challengeId: string
  logId: string
  log: Log | null
  error: Error | null
}

export default function LogCreationUpdatePage(props: Props) {
  const { challengeId, logId = null, log } = props

  const form = useForm({
    defaultValues: log || defaultValues,
    resolver,
  })

  const { createLog, createLogIsLoading } = useCreateLog()
  const { updateLog, updateLogIsLoading } = useUpdateLog()

  const isEditPage = Boolean(logId)
  const buttonLabel = isEditPage ? 'Update Log' : 'Create Log'
  const title = isEditPage ? 'Edit Log' : 'Create Log'

  const onSubmitHandler: SubmitHandler<LogFormValues> = async (formData) => {
    if (isEditPage && logId) {
      await updateLog(
        {
          ...formData,
          challengeId,
          logId,
        },
        {
          onSuccess: () => {
            toast.success('Log updated successfully')
            router.get(`/dashboard/challenges/${challengeId}/logs`)
          },
          onError: () => {
            toast.error('Failed to update log')
          },
        }
      )
      return
    }

    await createLog(
      {
        ...formData,
        challengeId,
      },
      {
        onSuccess: () => {
          toast.success('Log created successfully')
          router.get(`/dashboard/challenges/${challengeId}/logs`)
        },
        onError: () => {
          toast.error('Failed to create log')
        },
      }
    )
  }

  return (
    <div>
      <header className="flex items-center gap-4">
        <Typography.H1>{title}</Typography.H1>

        {isEditPage && logId && <DeleteLogAlert challengeId={challengeId} logId={logId} />}
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)}>
          <FieldsGenerator fields={logFormFields} form={form} />

          <div>
            <LoadingButton type="submit" isLoading={createLogIsLoading || updateLogIsLoading}>
              {buttonLabel}
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
