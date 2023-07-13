import { MOVIES_URL } from "../constant/constants";

class MoviesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl
  }

  _checkResponse(res) {

    if (res.ok) {

      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);

  }

  getMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`)
      .then(this._checkResponse)
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: MOVIES_URL
})
