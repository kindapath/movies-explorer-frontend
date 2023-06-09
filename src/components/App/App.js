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
import { addCards, checkScreenSize, filterShortMovies, getAllLikedStored, getAllStoredCards, search } from '../../utils/utils';
import { SAVEDMOVIESPATH, SIGNINPATH, SIGNUPPATH } from '../../constant/constants';

function App() {
  const navigate = useNavigate();
  const isBigScreen = useMediaQuery({ query: '(min-width: 1024px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 544px)' })

  const location = useLocation()
  const savedMoviesLocation = location.pathname === SAVEDMOVIESPATH

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  const [renderedCards, setRenderedCards] = useState([])
  const [inputOn, setInputOn] = useState(false)

  const [hiddenSubmit, setHiddenSubmit] = useState(true)
  const [hiddenMore, setHiddenMore] = useState(false)

  const [isFilterChecked, setIsFilterChecked] = useState(null)


  const [isNotFoundError, setIsNotFoundError] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorApi, setErrorApi] = useState('')

  const [successMsg, setSuccessMsg] = useState('')

  const [likedMovies, setLikedMovies] = useState([])

  const [lastSearch, setLastSearch] = useState({
    cards: JSON.parse(localStorage.getItem('lastSearch')) ? JSON.parse(localStorage.getItem('lastSearch')) : null,
    text: localStorage.getItem('lastSearchText') ? localStorage.getItem('lastSearchText') : null,
    filter: JSON.parse(localStorage.getItem('lastSearchFilter')) ? JSON.parse(localStorage.getItem('lastSearchFilter')) : null,
  })

  const [lastSearchLiked, setLastSearchLiked] = useState({
    cards: JSON.parse(localStorage.getItem('lastSearchLiked')) ? JSON.parse(localStorage.getItem('lastSearchLiked')) : null,
    text: localStorage.getItem('lastSearchTextLiked') ? localStorage.getItem('lastSearchTextLiked') : null,
    filter: JSON.parse(localStorage.getItem('lastSearchFilterLiked')) ? JSON.parse(localStorage.getItem('lastSearchFilterLiked')) : false,
  })

  const [rangeFrom, setRangeFrom] = useState()
  const [rangeTo, setRangeTo] = useState()

  const [initialCards, setInitialCards] = useState([])
  const [initialLiked, setInitialLiked] = useState([])

  useEffect(() => {
    lastSearch.cards = JSON.parse(localStorage.getItem('lastSearch'))
  }, [renderedCards])

  useEffect(() => {
    setRangeFrom(Number(renderedCards.length))
    setRangeTo(Number(renderedCards.length + addCards(isBigScreen, isMediumScreen)))

    if ((rangeTo >= filterShortMovies(initialCards).length) && isFilterChecked === true) {
      setHiddenMore(true)
    } else if (rangeTo >= initialCards.length) {
      setHiddenMore(true)
    } else {
      setHiddenMore(false)
    }
  }, [renderedCards])

  useEffect(() => {
    checkToken()
  }, [])

  function getLikedMovies() {
    mainApi.getLikedMovies()
      .then((updatedMovies) => {
        setLikedMovies(updatedMovies)
        setInitialLiked(updatedMovies)
        localStorage.setItem('allLikedStored', JSON.stringify(updatedMovies))
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
    if (savedMoviesLocation) {

      if (isFilterChecked === true) {
        setLikedMovies(filterShortMovies(likedMovies))
        JSON.stringify(localStorage.setItem('lastSearchFilterLiked', isFilterChecked))
      } else {
        setLikedMovies(initialLiked)
        JSON.stringify(localStorage.setItem('lastSearchFilterLiked', isFilterChecked))
      }

    } else {

      if (isFilterChecked === true) {
        setRenderedCards(filterShortMovies(initialCards))
        JSON.stringify(localStorage.setItem('lastSearchFilter', isFilterChecked))
      } else if (isFilterChecked === false) {
        // setRenderedCards(initialCards)
        setRenderedCards(checkScreenSize({
          isBigScreen,
          isMediumScreen,
          array: initialCards
        }))
        JSON.stringify(localStorage.setItem('lastSearchFilter', isFilterChecked))
      }

    }
  }, [isFilterChecked])

  function handleCheckClick(e) {
    setIsFilterChecked(e.target.checked)
  }

  function handleSearch(keyword) {
    setIsError(false)
    setIsNotFoundError(false)
    setIsLoading(true)
    setHiddenMore(false)

    localStorage.setItem('lastSearchText', keyword)

    if (getAllStoredCards() !== null) {
      try {
        renderAdaptively(keyword, getAllStoredCards())
        JSON.stringify(localStorage.setItem('lastSearchFilter', isFilterChecked))
      } catch (err) {
        if (err instanceof NotFoundError) {
          setIsNotFoundError(true)
          return
        }
        setIsError(true)
      }

    } else {
      moviesApi.getMovies()
        .then((movies) => {

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

  function handleSavedSearch(keyword) {
    setIsError(false)
    setIsNotFoundError(false)
    setIsLoading(true)
    localStorage.setItem('lastSearchTextLiked', keyword)

    if (getAllLikedStored() !== null) {
      try {
        renderAdaptively(keyword, getAllLikedStored(), setInitialLiked)
      } catch (err) {
        if (err instanceof NotFoundError) {
          setIsNotFoundError(true)
          return
        }
        setIsError(true)
      }
    } else {

      mainApi.getLikedMovies()
        .then((likedMovies) => {
          localStorage.setItem('allLikedStored', JSON.stringify(likedMovies))

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

  }

  function renderAdaptively(keyword, movies, setInitialLiked) {
    setIsLoading(false)

    const sliced = checkScreenSize({
      isBigScreen,
      isMediumScreen,
      array: search(keyword, movies, isFilterChecked, setInitialCards, setInitialLiked)
    })

    if (savedMoviesLocation) {
      setLikedMovies(sliced)
      localStorage.setItem('lastSearchLiked', JSON.stringify(sliced))
    } else {
      setRenderedCards(sliced)
      localStorage.setItem('lastSearch', JSON.stringify(sliced))
    }

  }



  function handleMore() {

    const slicedRange = initialCards.slice(rangeFrom, rangeTo)

    const newCards = renderedCards.concat(slicedRange)

    setRenderedCards(newCards)

  }

  // меняем стейт логина и переводим юзера на страницу фильмов
  const handleLogin = (userData) => {
    setIsLoggedIn(!isLoggedIn)
    setErrorApi('')
    setCurrentUser({
      name: userData.name,
      email: userData.email
    })
    getLikedMovies()
    if (location.pathname === SIGNINPATH || location.pathname === SIGNUPPATH) {
      navigate('/movies')
    } else {
      navigate(location.pathname)
    }

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
        localStorage.clear()
        setRenderedCards([])
        setInitialCards([])
        setIsFilterChecked(false)
        setIsLoggedIn(false)

        setLastSearch({
          cards: JSON.parse(localStorage.getItem('lastSearchLiked')) ? JSON.parse(localStorage.getItem('lastSearchLiked')) : null,
          text: localStorage.getItem('lastSearchTextLiked') ? localStorage.getItem('lastSearchTextLiked') : null,
          filter: JSON.parse(localStorage.getItem('lastSearchFilterLiked')) ? JSON.parse(localStorage.getItem('lastSearchFilterLiked')) : null,
        })

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
        localStorage.setItem('allLikedStored', JSON.stringify(newMovies))
      })
      .catch(err => console.log(err))
  }

  const likeCard = (movie) => {
    mainApi.likeCard(movie)
      .then((newMovie) => {
        const newMovies = [...likedMovies, newMovie]
        setLikedMovies(newMovies)
        localStorage.setItem('allLikedStored', JSON.stringify(newMovies))
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
                  hiddenMore={hiddenMore}

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
                  isError={isError}
                  isNotFoundError={isNotFoundError}
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
