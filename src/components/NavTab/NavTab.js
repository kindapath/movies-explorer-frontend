// компонент с навигацией по странице «О проекте»
import { HashLink } from 'react-router-hash-link';
import './NavTab.css';

const NavTab = () => {

  const navLinks = [
    {
      title: 'О проекте',
      to: '#about-project'
    },
    {
      title: 'Технологии',
      to: '#techs'
    },
    {
      title: 'Студент',
      to: '#about-me'
    }
  ]

  return (
    <nav className='navtab'>
      <ul className='navtab__list'>
        {
          navLinks.map((link, index) => {
            return (
              <li className='link navtab__list-item' key={index}>
                <HashLink className='navtab__link' to={link.to} smooth>{link.title}</HashLink>
              </li>
            )
          })
        }

      </ul>
    </nav>
  )
}

export default NavTab;
