import { useField, FormikProps, FieldHookConfig } from 'formik'


type OtherProps = {
  rows: number,
  label?: string,
  placeholder?: string
}

export const TextareaInput = ({label, placeholder, ...props}: OtherProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props)
  return (
  <div className='mt-3'>
      {label ? (
	<label className='form-label' htmlFor={props.id || props.name}>{label}</label>
      ) : null}
      <textarea className="text-input form-control" {...field} />
      {meta.touched && meta.error ? (
      <div className="error">{meta.error}</div>
      ) : null}
  </div>
  )
}
