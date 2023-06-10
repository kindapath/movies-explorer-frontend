// компонент с информацией о студенте.
import { Link } from 'react-router-dom';
import Section from '../Section/Section';
import SectionTitle from '../SectionTitle/SectionTitle';
import arrow from '../../images/arrow.svg'
import myPhoto from '../../images/myPhoto.jpg'
import './AboutMe.css';

const AboutMe = () => {
  return (
    <section className="about-me main__about-me" id="about-me">
      <SectionTitle title="Студент" />

      <article className='about-me__group'>

        <div className='about-me__bio'>
          <h2 className='about-me__name'>Евгений</h2>

          <h3 className='about-me__job'>Фронтенд-разработчик, 21 год</h3>

          <p className='about-me__story'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>

          <Link className='about-me__git link' to='https://github.com/kindapath'>Github</Link>

        </div>

        <img className='about-me__photo' src={myPhoto} alt='Мое фото' />

      </article>



      <h3 className='about-me__portfolio'>Портфолио</h3>

      <ul className='about-me__list'>

        <li className='about-me__item'>
          <Link className='about-me__link link' to="https://github.com/kindapath/how-to-learn" target='_blank'>
            <p className='about-me__link-text'>Статичный сайт</p>

            <img className='about-me__icon' src={arrow} alt='arrow' />
          </Link>
        </li>

        <li className='about-me__item'>
          <Link className='about-me__link link' to='https://kindapath.github.io/russian-travel/' target='_blank'>
            <p className='about-me__link-text'>Адаптивный сайт</p>

            <img src={arrow} alt='arrow' />
          </Link>
        </li>

        <li className='about-me__item'>
          <Link className='about-me__link link' to="https://kindaboii.nomoredomains.monster/" target='_blank'>
            <p className='about-me__link-text'>Одностраничное приложение</p>

            <img src={arrow} alt='arrow' />
          </Link>
        </li>

      </ul>

    </section>
  )
}

export default AboutMe;
