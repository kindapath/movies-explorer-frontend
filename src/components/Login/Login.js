// компонент страницы авторизации
import AuthPage from '../AuthPage/AuthPage';
import './Login.css';
import Input from '../Input/Input';
import Form from '../Form/Form';
import useValidation from '../../hooks/useValidation';

const Login = ({ handleLogin }) => {
  const {
    values,
    error,
    onChange,
    formValid
  } = useValidation();

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
        onSubmit={handleLogin}
        formValid={formValid}

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
