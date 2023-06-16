// компонент страницы авторизации
import AuthPage from '../AuthPage/AuthPage';
import './Login.css';
import Input from '../Input/Input';
import Form from '../Form/Form';

const Login = () => {
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

        buttonText='Войти'
      >
        <Input />

        <Input />

      </Form>
    </AuthPage>
  )
}

export default Login;
