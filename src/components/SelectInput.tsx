import { useField, FormikProps, FieldHookConfig } from 'formik'

import 'styles/FormStyles.scss'

import { useSnapshot } from 'valtio'
import { store } from 'store'


type OtherProps = {
  label?: string;
  placeholder?: string,
  children?: React.ReactNode
}

export const SelectInput = ({label, placeholder, children, ...props}: OtherProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props)
  return (
  <div className='mt-3'>
      {label ? (
	<label className='form-label' htmlFor={props.id || props.name}>{label}</label>
      ) : null}
      <select {...field}>
	{children}
      </select>
      {meta.touched && meta.error ? (
	<div className="error">{meta.error}</div>
      ) : null}
  </div>
  )
}
