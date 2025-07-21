import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  sessionId: localStorage.getItem('session_id') || null,

  setSession: (sessionId) => {
    localStorage.setItem('session_id', sessionId)
    set({ sessionId })
  },

  clearSession: () => {
    localStorage.removeItem('session_id')
    set({ sessionId: null })
  },

  logout: () => {
    localStorage.removeItem('session_id')
    set({ sessionId: null })
  }
}))
