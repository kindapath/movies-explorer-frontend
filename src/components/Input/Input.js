// компонент импута
import './Input.css';

const Input = ({ name, value, onChange, type, addclass, formValid, errorText, ...props }) => {
  return (
    <>
      <label className='form__label'>
        Имя
        <input
          className={`form__input form__input_type_${name} ${addclass}`}
          name={name}
          type={type}
          id={`${name}-input}`}
          value={value}
          onChange={onChange}
          {...props}
        />
        <span className={`form__input-error ${formValid ? '' : 'popup__input-error_active'} title-input-error`}>Что-то пошло не так...</span>
      </label>

    </>
  )
}

export default Input;
