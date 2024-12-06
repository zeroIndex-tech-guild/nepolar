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
import { useDeleteBlog } from '~/hooks/blogs/useDeleteBlog'

export const DeleteBlogAlert = ({ blogId }: { blogId: string }) => {
  const { deleteBlog, isDeletingBlog } = useDeleteBlog()

  const onClick = async () => {
    await deleteBlog(blogId, {
      onError: () => {
        toast.error('Something went wrong. Please try again.')
      },
      onSuccess: () => {
        toast.success('Blog deleted successfully.')
        router.replace('/blogs')
      },
    })
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
            <LoadingButton isLoading={isDeletingBlog} variant={'destructive'}>
              Continue
            </LoadingButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
