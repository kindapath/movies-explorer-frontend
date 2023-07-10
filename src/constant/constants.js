const SAVEDMOVIESPATH = '/saved-movies'
const MOVIESPATH = '/movies'
const SIGNINPATH = '/signin'
const SIGNUPPATH = '/signup'


const ALLCARDSSTORED = JSON.parse(localStorage.getItem('allLikedStored'))
const ALLLIKEDSTORED = JSON.parse(localStorage.getItem('allLikedStored'))

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

export {
  SAVEDMOVIESPATH,
  MOVIESPATH,
  ALLCARDSSTORED,
  ALLLIKEDSTORED,
  SIGNINPATH,
  SIGNUPPATH,
  MENUITEMS,
  NAVLINKS
}
