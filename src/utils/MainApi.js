class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl
  }

  _checkResponse(res) {

    if (res.ok) {

      return res.json();
    }
    return res.json().then(err => { throw new Error(err.message) })

  }

  register({ name, email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": password,
        "email": email,
        "name": name
      })
    })
      .then(this._checkResponse);
  };

  login({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": password,
        "email": email,
      })
    })
      .then(this._checkResponse);
  };

  logout() {
    return fetch(`${this._baseUrl}/signout`, {
      credentials: 'include',
    })
      .then(this._checkResponse);
  }

  editProfile({ email, name }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": name,
        "email": email,
      })
    })
      .then(this._checkResponse);
  }


  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(this._checkResponse);
  }

  getLikedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      },
    })
      .then(this._checkResponse);
  }

  likeCard(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "country": movie.country,
        "director": movie.director,
        "duration": movie.duration,
        "year": movie.year,
        "description": movie.description,
        "image": `https://api.nomoreparties.co${movie.image.url}`,
        "trailerLink": movie.trailerLink,
        "thumbnail": `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        "movieId": movie.id,
        "nameRU": movie.nameRU,
        "nameEN": movie.nameEN
      })
    })
      .then(this._checkResponse);
  }

  dislikeCard(objectId) {
    return fetch(`${this._baseUrl}/movies/${objectId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      },
    })
      .then(this._checkResponse);
  }
}
export const mainApi = new MainApi({
  baseUrl: 'https://api.zhenya.nomoredomains.rocks',
})
