// компонент страницы изменения профиля
import { useContext, useState } from 'react';
import { CurrentUser } from '../../contexts/CurrentUser'
import './Profile.css';
import Form from '../Form/Form';
import { useFormWithValidation } from '../../hooks/useForm';


const Profile = ({
  errorApi,
  onEditProfile,
  inputOn,
  hiddenSubmit,
  setInputOn,
  setHiddenSubmit,
  onLogout
}) => {
  const currentUser = useContext(CurrentUser)

  function handleSubmit(e) {
    e.preventDefault()
    onEditProfile(values)
  }

  function handleLogout(e) {
    e.preventDefault()
    onLogout(values)
  }
  const {
    values,
    error,
    onChange,
    formValid,
  } = useFormWithValidation()

  return (
    <section className='profile'>

      <div className='profile__info'>
        <h1 className='profile__hello'>Привет, {currentUser.name}</h1>

        <Form
          className='profile__form'
          name='register'
          onSubmit={handleSubmit}
          formValid={formValid}
          errorApi={errorApi}

          buttonText='Сохранить'
          hiddenSubmit={hiddenSubmit}
        >
          <div className='profile__row'>
            <p className='profile__text profile__text_bold'>Имя</p>
            <input
              name="name"
              type="text"
              className='profile__text'
              onChange={onChange}
              value={inputOn ? values.name : currentUser.name}

              minLength={2}
              maxLength={30}
              required

              disabled={!inputOn}
            />
          </div>

          <div className='profile__row'>
            <p className='profile__text profile__text_bold'>Email</p>
            <input
              name="email"
              type="email"
              className='profile__text'
              onChange={onChange}
              value={inputOn ? values.email : currentUser.email}

              required
              disabled={!inputOn}
            />
          </div>
        </Form>

      </div>

      {
        !inputOn
        &&
        <div className='profile__actions'>
          <button
            className='profile__button button'
            onClick={() => {
              setInputOn(true)
              setHiddenSubmit(false)
            }}>Редактировать</button>
          <button onClick={handleLogout} className='profile__button profile__button_red button'>Выйти из аккаунта</button>
        </div>
      }


    </section>
  )
}

export default Profile;
