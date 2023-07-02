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


import { useMediaQuery } from 'react-responsive'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import NotFound from '../NotFound/NotFound';
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';
import { CurrentUser } from '../../contexts/CurrentUser';
import Error from '../Error/Error';
import { mainApi } from '../../utils/MainApi';

function App() {
  const navigate = useNavigate();
  const isBigScreen = useMediaQuery({ query: '(min-width: 1024px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 544px)' })
  const isSmallScreen = useMediaQuery({ query: '(max-width: 544px)' })



  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [allCards, setAllCards] = useState([])
  const [renderedCards, setRenderedCards] = useState([])
  const [inputOn, setInputOn] = useState(false)
  const [hiddenSubmit, setHiddenSubmit] = useState(true)

  const [isNotFoundError, setIsNotFoundError] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorApi, setErrorApi] = useState('')

  const [likedMovies, setLikedMovies] = useState([])

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

  function handleSearch() {
    setIsLoading(true)
    moviesApi.getMovies()
      .then((movies) => {
        // throw new Error()
        setIsLoading(false)

        setAllCards(movies)

        let sliced = null

        if (isBigScreen) {
          sliced = movies.slice(0, 12)
        } else if (isMediumScreen) {
          sliced = movies.slice(0, 8)
        } else {
          sliced = movies.slice(0, 5)
        }

        setRenderedCards(sliced)

      })
      .catch(() => { })
  }

  function handleMore() {
    // take allCards array

    // take renderedCards array

    // create moreSliced const source of which will be allCards

    // take renderedCards.length and rendreredCards.length + 16/8/5

    const rangeFrom = Number(renderedCards.length)
    const rangeTo = Number(renderedCards.length + 16)

    // take items from the range of renderedCards.length to rendreredCards.length + 16/8/5
    // and assign them to moreSliced
    const slicedRange = allCards.slice(rangeFrom, rangeTo)

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
      })
      .catch((err) => {
        setErrorApi(err.message)
      })
  }

  const onLike = (movie, objectId) => {
    const isLiked = likedMovies.some((likedMovie) => likedMovie.movieId === movie.id);

    if (isLiked) {
      mainApi.dislikeCard(objectId)
        .then((newMovie) => {
          const newMovies = likedMovies.filter((likedMovie) => likedMovie.movieId === newMovie.movieId ? null : likedMovie)
          setLikedMovies(newMovies)
        })
        .catch(err => console.log(err))
    } else {
      mainApi.likeCard(movie)
        .then((newMovie) => {
          const newMovies = [...likedMovies, newMovie]
          setLikedMovies(newMovies)
        })
        .catch(err => console.log(err))
    }

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

                  onLike={onLike}
                  likedMovies={likedMovies}
                  getLikedMovies={getLikedMovies}

                  handleMore={handleMore}
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
