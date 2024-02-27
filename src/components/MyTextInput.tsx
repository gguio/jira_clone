import { useField, FormikProps, FieldHookConfig } from 'formik'

import 'styles/FormStyles.scss'


type OtherProps = {
  label?: string,
  placeholder?: string,
  className?: string
}

export const TextInput = ({label, className, placeholder, ...props}: OtherProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props)
  return (
  <div className='mt-3'>
      {label ? (
	<label className='form-label' htmlFor={props.id || props.name}>{label}</label>
      ) : null}
      <input 
	className={className ? className : "text-input form-control"} 
	placeholder={placeholder ? placeholder : ''} 
	{...field} 
	type={props.type} 
      />
      {meta.touched && meta.error ? (
      <div className="error">{meta.error}</div>
      ) : null}
  </div>
  )
}
