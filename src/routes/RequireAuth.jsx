import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

const RequireAuth = ({ children }) => {
  const sessionId = useAuthStore(state => state.sessionId)
  if (!sessionId) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default RequireAuth
