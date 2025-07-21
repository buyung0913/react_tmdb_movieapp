import { sessionModel } from '../models/sessionModel'
import { loginViewModel } from '../viewmodels/loginViewModel'
import { useAuthStore } from '../store/authStore'

export const useDI = () => {
  const authStore = useAuthStore()
  const loginVM = loginViewModel(sessionModel, authStore)
  return { loginVM }
}
