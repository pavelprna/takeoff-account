import { FC } from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute: FC<{
  children: JSX.Element
  loggedIn: boolean
}> = ({ children, loggedIn }) => {
  return loggedIn === true ? children : <Navigate to='/login' />
}
