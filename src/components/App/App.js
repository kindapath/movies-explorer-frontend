
import AboutProject from '../AboutProject/AboutProject';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import './App.css';

import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="page">


      {/* routes */}
      <Routes>
        <Route path='/' element={<AboutProject />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
