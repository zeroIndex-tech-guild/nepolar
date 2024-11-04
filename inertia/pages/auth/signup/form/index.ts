import { Field } from "~/components/form-builder";
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

export const signupFields: Field[] = [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "nepali@nepolar.com"
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "********"
  },
  {
    name: "confirm_password",
    type: "password",
    label: "Confirm Password",
    placeholder: "********"
  }
]

const ZSignupSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email."
  }),
  password: z.string(),
  confirm_password: z.string()
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"]
})


export const defaultValues = {
  email: "",
  password: "",
  confirm_password: ""
}

export const resolver = zodResolver(ZSignupSchema)

export type TSignupValues = z.infer<typeof ZSignupSchema>
