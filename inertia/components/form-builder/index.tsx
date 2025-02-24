import { ControllerProps, ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { MDXEditor } from '../ui/mdx-editor'
import { DevTool } from '@hookform/devtools'
import { TagsInput } from '../ui/tags-input'

import env from '#start/env'

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
  render: (field: ControllerProps<any>) => JSX.Element
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

  switch (field.type) {
    case 'custom':
      // @ts-ignore
      return <FormField key={name} control={control} name={name} render={field.render} />
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
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                <MDXEditor
                  readOnly={false}
                  markdown={value}
                  onChange={onChange}
                  //imageDropHandler={async () => ''}
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
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <TagsInput value={value} onValueChange={onChange} placeholder={field.placeholder} />
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
      {fields.map((field) => (
        <>
          {env.get('NODE_ENV') === 'development' && <DevTool control={form.control} />},
          <FieldGenerator key={field.name} field={field} form={form} />
        </>
      ))}
    </>
  )
}
