import axios from '../api/tmdbApi' // pastikan axios instance TMDB

export const sessionModel = {
  async getRequestToken() {
    const { data } = await axios.get('/authentication/token/new')
    return data
  },

  async login(username, password, requestToken) {
    const { data } = await axios.post('/authentication/token/validate_with_login', {
      username,
      password,
      request_token: requestToken
    })
    return data
  },

  async createSession(requestToken) {
    const { data } = await axios.post('/authentication/session/new', {
      request_token: requestToken
    })
    return data
  },

  async getMovieList(page = 1, sessionId) {
    const { data } = await axios.get('/discover/movie', {
      params: {
        page,
        session_id: sessionId
      }
    })
    return data
  },

  async searchMovies(query, page = 1, sessionId) {
    const { data } = await axios.get('/search/movie', {
      params: {
        query,
        page,
        session_id: sessionId
      }
    })
    return data
  }
}
