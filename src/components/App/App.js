// app

import { useState } from 'react';
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState({
    name: 'Ника',
    email: 'nikaisbeatiful@gmail.com'
  })
  const [cards, setCards] = useState([])

  const [isNotFoundError, setIsNotFoundError] = useState(false)
  const [isError, setIsError] = useState(false)

  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn)
    navigate('/')
  }

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
                />
              }
            />

          </Route>

          <Route path='/signin' element={<Login isLoggedIn={isLoggedIn} handleLogin={handleLogin} />} />
          <Route path='/signup' element={<Register />} />

          <Route path='*' element={<NotFound />} />

        </Routes>
      </div>
    </CurrentUser.Provider>
  );
}

export default App;
