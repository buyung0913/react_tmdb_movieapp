import axios from 'axios'
import { useAuthStore } from '../store/authStore'

// Buat instance
const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY
  }
})

tmdbApi.interceptors.request.use(
  (config) => {
    const sessionId = localStorage.getItem('session_id')
    if(sessionId) {
      config.params = {
        ...config.params,
        sessionId: sessionId
      }
    }
    
    return config
  },
  (error) => {
    console.error('[Request Error]', error)
    return Promise.reject(error)
  }
)

// Response Interceptor: Tangani error global (401, 403, dll)
tmdbApi.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const status = error.response?.status

    if (status === 401 || status === 403) {
      console.warn('Unauthorized or Forbidden - mungkin session ID tidak valid')

      // Clear session
      useAuthStore.getState().clearSession()

      // Redirect to login
      window.location.href = '/login'
    }

    // Log error global
    return Promise.reject(error)
  }
)

export default tmdbApi
