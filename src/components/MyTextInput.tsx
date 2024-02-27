import { useField, FormikProps, FieldHookConfig } from 'formik'

import type { ComponentPropsWithoutRef } from 'react'


type OtherProps = {
  label?: string;
  placeholder: string
}

export const TextInput = ({label, placeholder, ...props}: OtherProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props)
  return (
  <div className='mt-3'>
      {label ? (
	<label className='form-label' htmlFor={props.id || props.name}>{label}</label>
      ) : null}
      <input className="text-input form-control" placeholder={placeholder} {...field} type={props.type} />
      {meta.touched && meta.error ? (
      <div className="error">{meta.error}</div>
      ) : null}
  </div>
  )
}
