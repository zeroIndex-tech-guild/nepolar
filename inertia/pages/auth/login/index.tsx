import { SubmitHandler, useForm } from 'react-hook-form'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { Form } from '~/components/ui/form'
import { resolver, defaultValues, TLoginValues, loginFields } from './form'
import { FieldsGenerator } from '~/components/form-builder'
import { Button } from '~/components/ui/button'
import { useLogin } from './hooks/useLogin'
import { Link } from '@inertiajs/react'
import { Typography } from '~/components/ui/typography'

export default function SignupPage() {
  const form = useForm({
    defaultValues,
    resolver,
  })

  const { login } = useLogin()

  const onHandleSubmit: SubmitHandler<TLoginValues> = async (data) => {
    await login(data)
  }

  return (
    <div className="grid place-items-center h-screen">
      <Card className="w-96">
        <CardHeader className="text-2xl">Welcome back to Neploar :)</CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onHandleSubmit)} className="flex flex-col gap-4">
              <FieldsGenerator fields={loginFields} form={form} />

              <Button type="submit" className="w-full text-white mt-4">
                Login
              </Button>
            </form>
          </Form>

          <Typography.P className="text-sm">
            New User?{' '}
            <Link href="/signup" className="text-blue-500 hover:underline underline-offset-1">
              Sign Up
            </Link>
          </Typography.P>
        </CardContent>
      </Card>
    </div>
  )
}
