import { SubmitHandler, useForm } from 'react-hook-form'
import { DashboardLayout } from '~/components/layouts/dashboard'
import { formFields, BlogFormValues, defaultValues, resolver } from './forms/index'
import { Typography } from '~/components/ui/typography'
import { Form } from '~/components/ui/form'
import { FieldsGenerator } from '~/components/form-builder'
import { Button } from '~/components/ui/button'
import { useCreateBlog } from '~/hooks/blogs/useCreateBlog'
import { Blog } from '~/types/blog'
import { useUpdateBlog } from '~/hooks/blogs/useUpdateBlog'

type Props = {
  blog: Blog
  isEditPage: boolean
  blogId: string
}

export default function BlogsCreatePage(props: Props) {
  const { blogId, blog, isEditPage } = props

  const form = useForm({
    defaultValues: blog || defaultValues,
    resolver,
  })

  const { createBlog } = useCreateBlog()
  const { updateBlog } = useUpdateBlog(blogId)

  const onSubmitHandler: SubmitHandler<BlogFormValues> = async (data) => {
    if (isEditPage) {
      await updateBlog(data)
      return
    }
    await createBlog(data)
  }

  const pageTitle = isEditPage ? `Edit ${blog?.title}` : 'Create Blog'
  const buttonLabel = isEditPage ? 'Update Blog' : 'Create Blog'

  return (
    <main>
      <Typography.H1>{pageTitle}</Typography.H1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)} className="flex flex-col gap-4">
          <FieldsGenerator fields={formFields} form={form} />

          <div>
            <Button>{buttonLabel}</Button>
          </div>
        </form>
      </Form>
    </main>
  )
}

BlogsCreatePage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
