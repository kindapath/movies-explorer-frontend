// компонент со ссылками на другие проекты.
import { Link } from 'react-router-dom';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <>
      <h3 className='portfolio'>Портфолио</h3>

      <ul className='portfolio__list'>

        <li className='portfolio__item'>
          <Link className='portfolio__link link' to="https://github.com/kindapath/how-to-learn" target='_blank'>
            <p className='portfolio__link-text'>Статичный сайт</p>

            <div className='portfolio__icon' alt='arrow'></div>
          </Link>
        </li>

        <li className='portfolio__item'>
          <Link className='portfolio__link link' to='https://kindapath.github.io/russian-travel/' target='_blank'>
            <p className='portfolio__link-text'>Адаптивный сайт</p>

            <div className='portfolio__icon' alt='arrow'></div>
          </Link>
        </li>

        <li className='portfolio__item'>
          <Link className='portfolio__link link' to="https://kindaboii.nomoredomains.monster/" target='_blank'>
            <p className='portfolio__link-text'>Одностраничное приложение</p>

            <div className='portfolio__icon' alt='arrow'></div>
          </Link>
        </li>

      </ul>
    </>

  )
}

export default Portfolio;
