import { SubmitHandler, useForm } from 'react-hook-form'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { Form } from '~/components/ui/form'
import { resolver, defaultValues, TSignupValues, signupFields } from './form'
import { FieldsGenerator } from '~/components/form-builder'
import { Button } from '~/components/ui/button'
import { useSignup } from './hooks/useSignup'
import { Link } from '@inertiajs/react'
import { Typography } from '~/components/ui/typography'

export default function SignupPage() {
  const form = useForm({
    defaultValues,
    resolver,
  })

  const { signup } = useSignup()

  const onHandleSubmit: SubmitHandler<TSignupValues> = async (data) => {
    const response = await signup(data)
    console.log({ response })
  }

  return (
    <div className="grid place-items-center h-screen">
      <Card className="w-96">
        <CardHeader className="text-2xl">Welcome to Neploar :)</CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onHandleSubmit)} className="flex flex-col gap-4">
              <FieldsGenerator fields={signupFields} form={form} />

              <Button type="submit" className="w-full text-white mt-4">
                Sign up :)
              </Button>
            </form>
          </Form>

          <Typography.P className="text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-500 hover:underline underline-offset-1">
              Login
            </Link>
          </Typography.P>
        </CardContent>
      </Card>
    </div>
  )
}
