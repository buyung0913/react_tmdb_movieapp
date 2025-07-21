import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

const Navbar = () => {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)
  const sessionId = useAuthStore((state) => state.sessionId)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav style={{
        display: 'flex',
        width: '720px',
        justifyContent: 'space-between',
        backgroundColor: '#01b4e4',
        color: 'white',
        padding: '1rem',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
    }}>
      <h1 style={{ margin: 0, fontSize: '1.25rem' }}>TMDB App</h1>
      {sessionId && (
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#fff',
            color: '#01b4e4',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Logout
        </button>
      )}
    </nav>
  )
}

export default Navbar
