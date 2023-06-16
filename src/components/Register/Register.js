// компонент страницы регистрации
import './Register.css';
import logo from '../../images/logo.svg'
import Form from '../Form/Form';
import Input from '../Input/Input';
import { Link } from 'react-router-dom';


const Register = () => {
  return (
    <section className='register'>
      <div className='register__container'>
        <img className="logo" src={logo} alt="Логотип" />

        <h1 className='register__hello'>Добро пожаловать!</h1>

        <Form>
          <div className='form__inputs'>
            <Input />

            <Input />

            <Input />


          </div>

          <button className={`form__button`} disabled={false} type="submit">Зарегистрироваться</button>

        </Form>
        <p className='register__text'>Уже зарегистрированы? <Link className='register__link link' to={'/signin'}>Войти</Link></p>

      </div>
    </section>
  )
}

export default Register;
