import axios from '../api/tmdbApi'

export const movieModel = {
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
