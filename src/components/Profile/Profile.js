// компонент страницы изменения профиля
import { useContext } from 'react';
import { CurrentUser } from '../../contexts/CurrentUser'
import './Profile.css';

const Profile = () => {
  const currentUser = useContext(CurrentUser)

  return (
    <section className='profile'>

      <div className='profile__info'>
        <h1 className='profile__hello'>Привет, {currentUser.name}</h1>

        <div className='profile__row'>
          <p className='profile__text profile__text_bold'>Имя</p>
          <p className='profile__text'>{currentUser.name}</p>
        </div>

        <div className='profile__row'>
          <p className='profile__text profile__text_bold'>Email</p>
          <p className='profile__text'>{currentUser.email}</p>
        </div>

      </div>

      <div className='profile__actions'>
        <button className='profile__button'>Редактировать</button>
        <button className='profile__button profile__button_red'>Выйти из аккаунта</button>
      </div>

    </section>
  )
}

export default Profile;
