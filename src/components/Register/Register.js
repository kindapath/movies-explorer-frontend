// компонент страницы регистрации
import AuthPage from '../AuthPage/AuthPage';
import Input from '../Input/Input';
import Form from '../Form/Form';
import useValidation from '../../hooks/useValidation';



const Register = () => {

  const {
    values,
    error,
    onChange,
    formValid
  } = useValidation();

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
        formValid={formValid}

        buttonText='Зарегистрироваться'
      >
        <Input
          label='Имя'
          type="text"
          name="name"
          value={values.name || ''}
          onChange={onChange}
          errorText={error.name}
          formValid={formValid}

          minLength={2}
          maxLength={30}
          required
        />

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

export default Register;
