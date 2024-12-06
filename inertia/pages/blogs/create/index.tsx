import { SubmitHandler, useForm } from 'react-hook-form'
import { DashboardLayout } from '~/components/layouts/dashboard'
import { formFields, BlogFormValues, defaultValues, resolver } from './forms/index'
import { Typography } from '~/components/ui/typography'
import { Form } from '~/components/ui/form'
import { FieldsGenerator } from '~/components/form-builder'
import { Button } from '~/components/ui/button'
import { useCreateBlog } from '~/hooks/blogs/useCreateBlog'

export default function BlogsCreatePage() {
  const form = useForm({
    defaultValues,
    resolver,
  })
  const { createBlog } = useCreateBlog()

  const onSubmitHandler: SubmitHandler<BlogFormValues> = async (data) => {
    await createBlog(data)
  }

  return (
    <main>
      <Typography.H1>Create Blog</Typography.H1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)} className="flex flex-col gap-4">
          <FieldsGenerator fields={formFields} form={form} />

          <div>
            <Button>Create Blog</Button>
          </div>
        </form>
      </Form>
    </main>
  )
}

BlogsCreatePage.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>
