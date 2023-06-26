// компонент страницы авторизации
import AuthPage from '../AuthPage/AuthPage';
import './Login.css';
import Input from '../Input/Input';
import Form from '../Form/Form';
import { useFormWithValidation } from '../../hooks/useForm';

const Login = ({ onLogin, errorApi }) => {
  const {
    values,
    error,
    onChange,
    formValid,
  } = useFormWithValidation()

  function handleSubmit(e) {
    e.preventDefault()
    onLogin(values)
  }

  return (
    <AuthPage
      welcomeText='Рады видеть!'
      buttonText='Войти'
      questionText='Ещё не зарегистрированы?'
      linkText='Регистрация'
      linkTo='/signup'
    >
      <Form
        name='login'
        onSubmit={handleSubmit}
        formValid={formValid}
        errorApi={errorApi}


        buttonText='Войти'
      >
        <Input
          label='Email'
          type="email"
          name="email"
          value={values.email || ''}
          onChange={onChange}
          errorText={error.email}
          formValid={formValid}

          required
        />

        <Input
          label='Пароль'
          type="password"
          name="password"
          value={values.password || ''}
          onChange={onChange}
          errorText={error.password}
          formValid={formValid}

          required
        />

      </Form>
    </AuthPage>
  )
}

export default Login;
