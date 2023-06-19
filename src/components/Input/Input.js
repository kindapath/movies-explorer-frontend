// компонент импута
import './Input.css';

const Input = ({
  label,
  name,
  value,
  onChange,
  type,
  formValid,
  errorText,
  ...props
}) => {
  return (
    <>
      <label className='form__label'>
        {label}
        <input
          className={`form__input`}
          name={name}
          type={type}
          id={`${name}-input}`}
          value={value}
          onChange={onChange}
          {...props}
        />
        <span className={`form__input-error`}>{errorText}</span>
      </label>

    </>
  )
}

export default Input;
