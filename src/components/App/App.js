// app

import { useEffect, useState } from 'react';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import './App.css';
import { moviesApi } from '../../utils/MoviesApi';
import NotFoundError from "../../errors/NotFoundError";


import { useMediaQuery } from 'react-responsive'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import NotFound from '../NotFound/NotFound';
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';
import { CurrentUser } from '../../contexts/CurrentUser';
import { mainApi } from '../../utils/MainApi';
import { filterShortMovies, search } from '../../utils/utils';

function App() {
  const navigate = useNavigate();
  const isBigScreen = useMediaQuery({ query: '(min-width: 1024px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 544px)' })

  const location = useLocation()
  const savedMoviesLocation = location.pathname === '/saved-movies'



  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  const [allCards, setAllCards] = useState([])
  const allCardsStored = JSON.parse(localStorage.getItem('allCardsStored'))


  const [renderedCards, setRenderedCards] = useState([])
  const [inputOn, setInputOn] = useState(false)
  const [hiddenSubmit, setHiddenSubmit] = useState(true)
  const [isFilterChecked, setIsFilterChecked] = useState(false)


  const [isNotFoundError, setIsNotFoundError] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorApi, setErrorApi] = useState('')

  const [successMsg, setSuccessMsg] = useState('')

  const [likedMovies, setLikedMovies] = useState([])

  const [lastSearch, setLastSearch] = useState({
    cards: JSON.parse(localStorage.getItem('lastSearch')) ? JSON.parse(localStorage.getItem('lastSearch')) : null,
    text: localStorage.getItem('lastSearchText') ? localStorage.getItem('lastSearchText') : null,
    filter: JSON.parse(localStorage.getItem('lastSearchFilter')) ? JSON.parse(localStorage.getItem('lastSearchFilter')) : false,
  })

  const [lastSearchLiked, setLastSearchLiked] = useState({
    cards: JSON.parse(localStorage.getItem('lastSearchLiked')) ? JSON.parse(localStorage.getItem('lastSearchLiked')) : null,
    text: localStorage.getItem('lastSearchTextLiked') ? localStorage.getItem('lastSearchTextLiked') : null,
    filter: JSON.parse(localStorage.getItem('lastSearchFilterLiked')) ? JSON.parse(localStorage.getItem('lastSearchFilterLiked')) : false,
  })

  useEffect(() => {
    lastSearch.cards = JSON.parse(localStorage.getItem('lastSearch'))
  }, [renderedCards])

  function getLikedMovies() {
    mainApi.getLikedMovies()
      .then((updatedMovies) => {
        setLikedMovies(updatedMovies)
      })
      .catch(err => console.log(err))
  }

  function checkToken() {
    mainApi.getUserInfo()
      .then((userData) => {
        handleLogin(userData)
      })
      .catch((err) => {
        navigate('/')
        console.log(err.message)
      })
  }

  useEffect(() => {
    checkToken()
  }, [])

  useEffect(() => {
    if (savedMoviesLocation) {
      setLikedMovies(filterShortMovies(likedMovies))
      JSON.stringify(localStorage.setItem('lastSearchFilterLiked', isFilterChecked))
    } else {
      setRenderedCards(filterShortMovies(renderedCards))
      JSON.stringify(localStorage.setItem('lastSearchFilter', isFilterChecked))
    }
  }, [isFilterChecked])

  function handleCheckClick() {
    setIsFilterChecked(!isFilterChecked)
  }

  function handleSearch(keyword) {
    setIsError(false)
    setIsNotFoundError(false)
    setIsLoading(true)
    localStorage.setItem('lastSearchText', keyword)

    if (lastSearch.cards !== null) {
      renderAdaptively(keyword, allCardsStored)
    } else {
      moviesApi.getMovies()
        .then((movies) => {
          setAllCards(movies)
          localStorage.setItem('allCardsStored', JSON.stringify(movies))

          renderAdaptively(keyword, movies)

        })
        .catch((err) => {
          if (err instanceof NotFoundError) {
            setIsNotFoundError(true)
            return
          }
          setIsError(true)
        })
    }

  }

  function renderAdaptively(keyword, movies) {
    setIsLoading(false)

    let sliced = null

    // instead of movies.slice(0, 12) we can use search(movies) util function
    // that will return an array with found results
    if (isBigScreen) {
      sliced = search(keyword, movies, isFilterChecked).slice(0, 12)
    } else if (isMediumScreen) {
      sliced = search(keyword, movies, isFilterChecked).slice(0, 8)
    } else {
      sliced = search(keyword, movies, isFilterChecked).slice(0, 5)
    }

    if (savedMoviesLocation) {
      setLikedMovies(sliced)
      localStorage.setItem('lastSearchLiked', JSON.stringify(sliced))
    } else {
      setRenderedCards(sliced)
      localStorage.setItem('lastSearch', JSON.stringify(sliced))
    }

  }

  function handleSavedSearch(keyword) {
    setIsError(false)
    setIsNotFoundError(false)
    setIsLoading(true)
    localStorage.setItem('lastSearchTextLiked', keyword)

    mainApi.getLikedMovies()
      .then((likedMovies) => {

        renderAdaptively(keyword, likedMovies)

      })
      .catch((err) => {
        if (err instanceof NotFoundError) {
          setIsNotFoundError(true)
          return
        }
        setIsError(true)
      })
  }

  function handleMore() {

    const addCards = () => {
      if (isBigScreen) {
        return 3
      } else if (isMediumScreen) {
        return 2
      } else {
        return 2
      }
    }
    // take renderedCards.length and rendreredCards.length + 16/8/5

    const rangeFrom = Number(renderedCards.length)
    const rangeTo = Number(renderedCards.length + addCards())

    // take items from the range of renderedCards.length to rendreredCards.length + 16/8/5
    // and assign them to moreSliced

    const slicedRange = allCardsStored !== null ? allCardsStored.slice(rangeFrom, rangeTo) : allCards.slice(rangeFrom, rangeTo)

    // const newCards = copy renderedCards and add moreSliced
    const newCards = renderedCards.concat(slicedRange)

    // set renderedCards to newCards
    setRenderedCards(newCards)

  }

  // меняем стейт логина и переводим юзера на страницу фильмов
  const handleLogin = (userData) => {
    setIsLoggedIn(!isLoggedIn)
    setCurrentUser({
      name: userData.name, //TODO: исправить на бекенде - чтобы апи логина отдавал и name
      email: userData.email
    })
    navigate('/movies')

    // let lastSearch = null
    // lastSearch = JSON.parse(localStorage.getItem('lastSearch'))

    if (lastSearch.cards !== null) {
      renderAdaptively(lastSearch.text, lastSearch.cards)
    }
  }

  // регистрация
  function onRegister({ name, email, password }) {
    mainApi.register({ name, email, password })
      .then((userData) => {
        handleLogin(userData)
      })
      .catch((err) => {
        setErrorApi(err.message)
      })
  }

  // аутентификация и авторизация
  const onLogin = ({ email, password }) => {
    mainApi.login({ email, password })
      .then((userData) => {
        handleLogin(userData)
      })
      .catch((err) => {
        setErrorApi(err.message)
      })
  }

  const onLogout = () => {
    mainApi.logout()
      .then(() => {
        setIsLoggedIn(false)
        navigate('/')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const onEditProfile = ({ email, name }) => {
    mainApi.editProfile({ email, name })
      .then((userData) => {
        setCurrentUser({
          name: userData.name,
          email: userData.email
        })
        setInputOn(false)
        setHiddenSubmit(true)
        setErrorApi('')
        setSuccessMsg('Вы успешно изменили свой профиль')
      })
      .catch((err) => {
        setErrorApi(err.message)
      })
      .finally(() => {
        setTimeout(() => {
          setSuccessMsg('')
        }, 3000);
      })
  }

  const dislikeCard = (objectId) => {
    mainApi.dislikeCard(objectId)
      .then((newMovie) => {
        const newMovies = likedMovies.filter((likedMovie) => likedMovie.movieId === newMovie.movieId ? null : likedMovie)
        setLikedMovies(newMovies)
      })
      .catch(err => console.log(err))
  }

  const likeCard = (movie) => {
    mainApi.likeCard(movie)
      .then((newMovie) => {
        const newMovies = [...likedMovies, newMovie]
        setLikedMovies(newMovies)
      })
      .catch(err => console.log(err))
  }


  const onLike = (movie, objectId) => {
    const isLiked = likedMovies.some((likedMovie) => likedMovie.movieId === movie.id);

    if (isLiked) {
      dislikeCard(objectId)
    } else {
      likeCard(movie)
    }
  }
  const onRemove = (objectId) => {
    dislikeCard(objectId)
  }

  return (
    <CurrentUser.Provider value={currentUser}>
      <div className="page">

        {/* routes */}
        <Routes>

          <Route
            path="/"
            element={<Layout isLoggedIn={isLoggedIn} />}>

            <Route path='/'
              element={<Main />} />

            <Route
              path='movies'
              element={
                <ProtectedRouteElement
                  element={Movies}
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  handleSearch={handleSearch}
                  cards={renderedCards}
                  isNotFoundError={isNotFoundError}
                  isError={isError}

                  isFilterChecked={isFilterChecked}
                  handleCheckClick={handleCheckClick}

                  onLike={onLike}
                  likedMovies={likedMovies}
                  getLikedMovies={getLikedMovies}

                  handleMore={handleMore}

                  setIsFilterChecked={setIsFilterChecked}

                  lastSearch={lastSearch}
                />
              }
            />

            <Route
              path='saved-movies'
              element={
                <ProtectedRouteElement
                  element={SavedMovies}
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  likedMovies={likedMovies}
                  getLikedMovies={getLikedMovies}
                  onRemove={onRemove}
                  handleSavedSearch={handleSavedSearch}
                  isFilterChecked={isFilterChecked}
                  handleCheckClick={handleCheckClick}
                  setIsFilterChecked={setIsFilterChecked}

                  lastSearchLiked={lastSearchLiked}
                />
              }
            />

            <Route
              path='profile'
              element={
                <ProtectedRouteElement
                  element={Profile}
                  isLoggedIn={isLoggedIn}
                  errorApi={errorApi}
                  onEditProfile={onEditProfile}
                  inputOn={inputOn}
                  hiddenSubmit={hiddenSubmit}
                  setInputOn={setInputOn}
                  setHiddenSubmit={setHiddenSubmit}
                  onLogout={onLogout}
                  successMsg={successMsg}
                />
              }
            />

          </Route>

          <Route path='/signin' element={
            <Login
              isLoggedIn={isLoggedIn}
              onLogin={onLogin}
              errorApi={errorApi}
            />} />
          <Route path='/signup' element={
            <Register
              onRegister={onRegister}
              errorApi={errorApi}
            />} />

          <Route path='*' element={<NotFound />} />

        </Routes>
      </div>
    </CurrentUser.Provider>
  );
}

export default App;
