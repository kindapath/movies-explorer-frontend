// компонент импута
import './Input.css';

const Input = ({
  label,

  name,
  value,
  onChange,
  type,
  addclass,
  formValid,
  errorText,
  ...props }) => {
  return (
    <>
      <label className='form__label'>
        {label}
        <input
          className={`form__input form__input_type_${name} ${addclass}`}
          name={name}
          type={type}
          id={`${name}-input}`}
          value={value}
          onChange={onChange}
          {...props}
        />
        <span className={`form__input-error ${formValid ? '' : 'form__input-error_active'}`}>Что-то пошло не так...</span>
      </label>

    </>
  )
}

export default Input;
