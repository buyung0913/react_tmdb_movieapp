import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginView from './views/LoginView'
import HomeView from './views/HomeView'
import RequireAuth from './routes/RequireAuth'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/" element={
          <RequireAuth>
            <HomeView />
          </RequireAuth>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
