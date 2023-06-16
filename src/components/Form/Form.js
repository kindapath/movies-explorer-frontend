// компонент формы
import './Form.css';

const Form = ({
  name,
  onSubmit,

  buttonText,

  children,
}) => {

  return (
    <form className={`form form_type_${name}`} name={name} onSubmit={onSubmit} noValidate>

      <div className={`form__inputs form__inputs_type_${name}`}>
        {children}
      </div>

      <button className={`form__button`} disabled={false} type="submit">{buttonText}</button>

    </form>
  )
}

export default Form;
