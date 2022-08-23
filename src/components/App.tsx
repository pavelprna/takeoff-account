import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { ContactsList } from './ContactsList'
import { Login } from './Login'
import { ProtectedRoute } from './ProtectedRoute'

export const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (loggedIn) {
      navigate('/')
    }
  }, [loggedIn, navigate])

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) setLoggedIn(true)
  }, [])

  const handleLogOut = () => {
    setLoggedIn(false)
    localStorage.removeItem('jwt')
  }

  return (
    <Routes>
      <Route path='/login' element={<Login setLoggedIn={setLoggedIn} />} />
      <Route
        path='/'
        element={
          <ProtectedRoute loggedIn={loggedIn}>
            <ContactsList onLogOut={handleLogOut} />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
