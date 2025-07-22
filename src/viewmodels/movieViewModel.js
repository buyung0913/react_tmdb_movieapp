import { movieModel } from '../models/movieModel'
import { makeAutoObservable, runInAction } from 'mobx'

export class MovieViewModel {
  movies = []
  page = 1
  totalPages = 1
  searchQuery = ''
  loading = false
  sessionId = null

  constructor(sessionId) {
    makeAutoObservable(this)
    this.sessionId = sessionId
  }

  setSearchQuery(query) {
    this.searchQuery = query
    this.page = 1
    this.fetchMovies()
  }

  setPage(newPage) {
    this.page = newPage
    this.fetchMovies()
  }

  async fetchMovies() {
    if (!this.sessionId) return

    this.loading = true
    try {
      let data
      if (this.searchQuery) {
        data = await movieModel.searchMovies(this.searchQuery, this.page, this.sessionId)
      } else {
        data = await movieModel.getMovieList(this.page, this.sessionId)
      }

      runInAction(() => {
        this.movies = data.results || []
        this.totalPages = data.total_pages || 1
      })
    } catch (error) {
      console.error('Gagal fetch movie:', error)
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }
}
