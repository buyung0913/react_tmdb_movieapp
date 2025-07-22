import { sessionModel } from '../models/sessionModel'
import { useAuthStore } from '../store/authStore'
import { loginViewModel } from '../viewmodels/loginViewModel'
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
