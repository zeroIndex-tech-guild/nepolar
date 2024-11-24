import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { MDXEditor } from '../ui/mdx-editor'
import { DevTool } from '@hookform/devtools'
import env from '#start/env'
import { TagsInput } from '../ui/tags-input'

type TInputElField = {
  name: string
  label: string
  placeholder: string
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'mdx' | 'tags-input'
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
                <Input {...field} placeholder={placeholder} type={type} />
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
    case 'mdx':
      return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                <MDXEditor
                  readOnly={false}
                  markdown={field.value}
                  onChange={field.onChange}
                  imageDropHandler={async () => ''}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
      )

    case 'tags-input': {
      const { label } = props.field as TInputElField
      return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <TagsInput
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder={field.placeholder}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
      )
    }
    default:
      const message = `Field type ${type} not supported`
      throw new Error(message)
  }
}

export const FieldsGenerator = (props: { fields: Field[]; form: UseFormReturn<any> }) => {
  const { fields, form } = props

  return (
    <>
      <DevTool control={form.control} />
      {fields.map((field) => (
        <FieldGenerator key={field.name} field={field} form={form} />
      ))}
    </>
  )
}
