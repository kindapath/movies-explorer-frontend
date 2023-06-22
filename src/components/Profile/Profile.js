// компонент страницы изменения профиля
import { useContext } from 'react';
import { CurrentUser } from '../../contexts/CurrentUser'
import './Profile.css';
import Form from '../Form/Form';

const Profile = () => {
  const currentUser = useContext(CurrentUser)

  return (
    <section className='profile'>

      <div className='profile__info'>
        <h1 className='profile__hello'>Привет, {currentUser.name}</h1>

        <form className='profile__form' onSubmit={() => { }} noValidate>
          <div className='profile__row'>
            <p className='profile__text profile__text_bold'>Имя</p>
            <input className='profile__text' value={currentUser.name} disabled={true} />
          </div>

          <div className='profile__row'>
            <p className='profile__text profile__text_bold'>Email</p>
            <input className='profile__text' value={currentUser.email} />
          </div>
        </form>

      </div>

      <div className='profile__actions'>
        <button className='profile__button'>Редактировать</button>
        <button className='profile__button profile__button_red'>Выйти из аккаунта</button>
      </div>

    </section>
  )
}

export default Profile;
