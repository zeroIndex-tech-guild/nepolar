import { InputHTMLAttributes } from "react"
import { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"


type TInputElField = {
  name: string
  label: string
  placeholder: string
  type: InputHTMLAttributes<HTMLInputElement>['type']
}

type TSelectField = {
  name: string
  label: string
  defaultValue: string
  type: "select"
}


export type Field = TInputElField | TSelectField

type FieldGeneratorProps = {
  field: Field
  form: UseFormReturn<any>
}
export const FieldGenerator = (props: FieldGeneratorProps) => {
  const { form, field } = props
  const { type, name } = field
  const control = form.control

  switch (type) {
    case "text":
    case "email":
    case "password":
      const { label, placeholder } = props.field as TInputElField
      return <FormField
        key={name}
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {label}
            </FormLabel>

            <FormControl>
              <Input {...field} placeholder={placeholder} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      >
      </FormField>

    case 'select':
      return <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {label}
            </FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
    default: throw new Error("Field type not supported")
  }
}

export const FieldsGenerator = (props: { fields: Field[], form: UseFormReturn<any> }) => {
  const { fields, form } = props
  return (
    <>
      {fields.map((field) => <FieldGenerator
        key={field.name}
        field={field}
        form={form}
      />)}
    </>
  )
}
