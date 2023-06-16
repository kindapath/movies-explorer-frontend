// компонент формы
import './Form.css';

const Form = ({ name, children }) => {
  return (
    <form className={`form form_type_${name}`} name={name} noValidate>
      {children}
    </form>
  )
}

export default Form;
