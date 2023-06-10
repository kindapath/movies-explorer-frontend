// презентационный компонент, который отрисовывает подвал
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer main__footer'>

      <p className='footer__study'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>

      <div className='footer__info'>
        <p className='footer__year'>© {new Date().getFullYear()}</p>

        <div className='footer__links'>
          <Link className='footer__link link' to='https://practicum.yandex.ru/' target='_blank'>Яндекс.Практикум</Link>
          <Link className='footer__link link' to='https://github.com/kindapath' target='_blank'>Github</Link>
        </div>

      </div>

    </footer>
  )
}

export default Footer;
