// app

import { useState } from 'react';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout/Layout';
import NotFound from '../NotFound/NotFound';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn)
  }

  return (
    <div className="page">

      {/* routes */}
      <Routes>

        <Route path="/" element={<Layout isLoggedIn={isLoggedIn} />}>
          <Route path='/' element={<Main />} />
          <Route path='movies' element={<Movies isLoggedIn={isLoggedIn} handleLogin={handleLogin} />} />
          <Route path='saved-movies' element={<SavedMovies isLoggedIn={isLoggedIn} handleLogin={handleLogin} />} />
        </Route>

        <Route path='/profile' element={<Profile />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
