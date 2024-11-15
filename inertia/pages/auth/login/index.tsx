import { SubmitHandler, useForm } from 'react-hook-form'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { Form } from '~/components/ui/form'
import { resolver, defaultValues, TLoginValues, loginFields } from './form'
import { FieldsGenerator } from '~/components/form-builder'
import { Button } from '~/components/ui/button'
import { useLogin } from './hooks/useLogin'
import { Link, router, usePage } from '@inertiajs/react'

export default function SignupPage() {
  const form = useForm({
    defaultValues,
    resolver,
  })
  const pp = usePage()
  console.log({ pp })

  const { login } = useLogin()

  const onHandleSubmit: SubmitHandler<TLoginValues> = async (data) => {
    const response = await login(data, {
      onSuccess: () => {
        router.replace('/dashboard')
      },
    })
  }

  return (
    <div className="grid place-items-center h-screen">
      <Card className="w-96">
        <CardHeader>Welcome back to Neploar :)</CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onHandleSubmit)}>
              <FieldsGenerator fields={loginFields} form={form} />

              <Button type="submit" className="w-full text-white mt-4">
                Login
              </Button>
            </form>
          </Form>
          <Link href="/signup">New User? Sign Up</Link>
        </CardContent>
      </Card>
    </div>
  )
}
