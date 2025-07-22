import { sessionModel } from '../models/sessionModel'
import { loginViewModel } from '../viewmodels/loginViewModel'
import { useAuthStore } from '../store/authStore'
import { MovieViewModel } from '../viewmodels/movieViewModel'

export const useDI = () => {
  const authStore = useAuthStore()
  const loginVM = loginViewModel(sessionModel, authStore)
  const sessionId = useAuthStore((state) => state.sessionId)
  return {
    movieVM: new MovieViewModel(sessionId),
    loginVM
  }
}
