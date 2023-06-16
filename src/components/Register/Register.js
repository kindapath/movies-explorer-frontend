// компонент страницы регистрации
import AuthPage from '../AuthPage/AuthPage';
import Input from '../Input/Input';
import Form from '../Form/Form';
import useValidation from '../../hooks/useValidation';



const Register = () => {

  return (
    <AuthPage
      welcomeText='Добро пожаловать!'
      questionText='Уже зарегистрированы?'
      linkText='Войти'
      linkTo='/signin'
    >

      <Form
        name='register'
        onSubmit={() => console.log('register')}

        buttonText='Зарегистрироваться'
      >
        <Input

          label='Имя'
          type="text"
        />

        <Input
          label='Email'
          type="email"
        />

        <Input
          label='Пароль'
          type="password"
        />

      </Form>

    </AuthPage>
  )
}

export default Register;
