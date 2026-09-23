import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

const useRequireAuth = (): ReactNode => {
  const token = localStorage.getItem('token')

  if (!token) return <Navigate to='/login' replace />

  return null
}

export default useRequireAuth
