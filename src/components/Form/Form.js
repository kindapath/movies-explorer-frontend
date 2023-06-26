// компонент формы
import Error from '../Error/Error';
import './Form.css';

const Form = ({
  name,
  onSubmit,
  formValid,

  buttonText,

  children,
  errorApi,

  hiddenSubmit
}) => {

  return (
    <form className={`form form_type_${name}`} name={name} onSubmit={onSubmit} noValidate>

      <div className={`form__inputs form__inputs_type_${name}`}>
        {children}
      </div>
      {
        errorApi !== '' &&
        <Error errorText={errorApi} addclass='error_auth' />
      }

      {
        hiddenSubmit
          ?
          ''
          :
          <button className={`form__button ${formValid ? '' : 'form__button_disabled'}`} disabled={formValid ? '' : true} type="submit">{buttonText}</button>

      }

    </form>
  )
}

export default Form;
