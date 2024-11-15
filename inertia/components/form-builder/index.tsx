import { InputHTMLAttributes } from 'react'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'

type TInputElField = {
  name: string
  label: string
  placeholder: string
  type: 'text' | 'email' | 'password' | 'number'
  required?: boolean
}

type TSelectField = {
  name: string
  label: string
  defaultValue: string
  type: 'select'
  options: { label: string; value: string }[]
  required?: boolean
}

type TCustomField = {
  name: string
  type: 'custom'
  render: (field: ControllerRenderProps) => JSX.Element
}

export type Field = TCustomField | TInputElField | TSelectField

type FieldGeneratorProps = {
  field: Field
  form: UseFormReturn<any>
}
export const FieldGenerator = (props: FieldGeneratorProps) => {
  const { form, field } = props
  const { type, name } = field
  const control = form.control

  switch (type) {
    case 'custom':
      return <FormField key={name} control={control} name={name} render={props.field.render} />
    case 'text':
    case 'email':
    case 'password':
    case 'number':
      const { label, placeholder } = props.field as TInputElField
      return (
        <FormField
          key={name}
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>

              <FormControl>
                <Input {...field} placeholder={placeholder} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        ></FormField>
      )

    case 'select':
      return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
      )
    default:
      throw new Error('Field type not supported')
  }
}

export const FieldsGenerator = (props: { fields: Field[]; form: UseFormReturn<any> }) => {
  const { fields, form } = props
  return (
    <>
      {fields.map((field) => (
        <FieldGenerator key={field.name} field={field} form={form} />
      ))}
    </>
  )
}
