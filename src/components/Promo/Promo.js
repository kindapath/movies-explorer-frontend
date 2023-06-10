// компонент с вёрсткой баннера страницы «О проекте».

import { HashLink } from 'react-router-hash-link';
import './Promo.css';

const Promo = () => {
  return (
    <section className='promo main__promo'>
      <h1 className='promo__heading'>Учебный проект студента факультета Веб-разработки.</h1>
      <nav className='promo__anchors'>
        <ul className='promo__list'>

          <li className='link promo__list-item'>
            <HashLink className='promo__link' to="#about-project" smooth>О проекте</HashLink>
          </li>

          <li className='link promo__list-item'>
            <HashLink className='promo__link' to="#techs" smooth>Технологии</HashLink>
          </li>

          <li className='link promo__list-item'>
            <HashLink className='promo__link' to="#about-me" smooth>Студент</HashLink>
          </li>

        </ul>
      </nav>
    </section>
  )
}

export default Promo;
