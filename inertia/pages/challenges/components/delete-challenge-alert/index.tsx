import { router } from '@inertiajs/react'
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
import { Button, LoadingButton } from '~/components/ui/button'
import { useDeleteChallenge } from '~/hooks/challenges/useDeleteChallange'

export const DeleteChallengeAlert = ({ challengeId }: { challengeId: string }) => {
  const { deleteChallenge, deleteChallengeIsLoading } = useDeleteChallenge()

  const onClick = async () => {
    await deleteChallenge(challengeId, {
      onError: () => {
        toast.error('Something went wrong. Please try again.')
      },
      onSuccess: () => {
        toast.success('Challenge deleted successfully.')
        router.visit('/challenges')
      },
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
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
            <LoadingButton isLoading={deleteChallengeIsLoading}>Continue</LoadingButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
