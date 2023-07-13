// компонент страницы регистрации
import AuthPage from '../AuthPage/AuthPage';
import Input from '../Input/Input';
import Form from '../Form/Form';
import { useFormWithValidation } from '../../hooks/useForm';
import { SIGNINPATH } from '../../constant/constants';



const Register = ({ onRegister, errorApi }) => {

  const {
    values,
    error,
    onChange,
    formValid,
  } = useFormWithValidation()

  function handleSubmit(e) {
    e.preventDefault()
    onRegister(values)
  }

  return (
    <AuthPage
      welcomeText='Добро пожаловать!'
      questionText='Уже зарегистрированы?'
      linkText='Войти'
      linkTo={SIGNINPATH}
    >

      <Form
        name='register'
        onSubmit={handleSubmit}
        formValid={formValid}
        errorApi={errorApi}

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
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
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
