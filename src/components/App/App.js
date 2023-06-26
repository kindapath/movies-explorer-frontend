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


import { Route, Routes, useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import NotFound from '../NotFound/NotFound';
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';
import { CurrentUser } from '../../contexts/CurrentUser';
import { Alert, AlertTitle } from '@mui/material';
import Error from '../Error/Error';
import { mainApi } from '../../utils/MainApi';

function App() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [inputOn, setInputOn] = useState(false)
  const [hiddenSubmit, setHiddenSubmit] = useState(true)

  const [isNotFoundError, setIsNotFoundError] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorApi, setErrorApi] = useState('')

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
        setCards(movies)
        localStorage.setItem("cards", movies)
      })
      .catch(() => { })
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
        console.log('logout succesfully')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const onEditProfile = ({ email, name }) => {
    mainApi.editProfile({ email, name })
      .then((userData) => {
        console.log(userData)
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
                  cards={cards}
                  isNotFoundError={isNotFoundError}
                  isError={isError}
                />
              }
            />

            <Route
              path='saved-movies'
              element={
                <ProtectedRouteElement
                  element={SavedMovies}
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading} />
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
