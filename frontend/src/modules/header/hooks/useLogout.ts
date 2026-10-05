import { useNavigate } from 'react-router-dom'
import { clearLocalStorage } from 'src/api/helper'

const useLogout = () => {
  const navigate = useNavigate()

  return () => {
    clearLocalStorage()
    navigate('/login', { replace: true })
  }
}

export default useLogout
