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
  }
}
