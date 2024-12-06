import { router } from '@inertiajs/react'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog'
import { LoadingButton } from '~/components/ui/button'
import { useDeleteLog } from '~/hooks/logs/users/useDeleteLog'

export const DeleteLogAlert = ({ challengeId, logId }: { challengeId: string; logId: string }) => {
  const { deleteLog, isDeletingLog } = useDeleteLog()

  const onClick = async () => {
    await deleteLog(
      { challengeId, logId },
      {
        onError: () => {
          toast.error('Something went wrong. Please try again.')
        },
        onSuccess: () => {
          toast.success('Log deleted successfully.')
          router.visit('/dashboard/challenges')
        },
      }
    )
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2 size={32} className="hover:text-red-500 cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="items-center">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onClick} asChild>
            <LoadingButton isLoading={isDeletingLog} variant={'destructive'}>
              Continue
            </LoadingButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
