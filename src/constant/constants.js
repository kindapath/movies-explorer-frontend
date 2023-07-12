const SAVEDMOVIESPATH = '/saved-movies'
const MOVIESPATH = '/movies'
const SIGNINPATH = '/signin'
const SIGNUPPATH = '/signup'

const MENUITEMS = [
  {
    title: "Главная",
    to: "/",
  },
  {
    title: "Фильмы",
    to: "/movies",
  },
  {
    title: "Сохраненные фильмы",
    to: "/saved-movies",
  },
];

const NAVLINKS = [
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

const MAIN_URL = 'https://api.zhenya.nomoredomains.rocks'
const MOVIES_URL = 'https://api.nomoreparties.co'

export {
  SAVEDMOVIESPATH,
  MOVIESPATH,
  SIGNINPATH,
  SIGNUPPATH,
  MENUITEMS,
  NAVLINKS,
  MAIN_URL,
  MOVIES_URL
}
