import { useIdleTimer } from 'react-idle-timer'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const IDLE_TIMEOUT = 1000 * 60 * 120 // 2 hours
const BROADCAST_KEY = 'app-logout-event'

export const IdleTimerProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()

  const onIdle = () => {
    console.info('User is idle, logging out...')
    localStorage.removeItem('token')
    localStorage.setItem(BROADCAST_KEY, Date.now().toString())
    navigate('/login')
  }

  useIdleTimer({
    timeout: IDLE_TIMEOUT,
    onIdle,
    debounce: 500,
    crossTab: true,
    events: ['mousemove', 'keypress', 'scroll']
  })

  useEffect(() => {
    const syncLogout = (event: StorageEvent) => {
      if (event.key === BROADCAST_KEY) {
        localStorage.removeItem('token')
        navigate('/login')
      }
    }

    window.addEventListener('storage', syncLogout)
    return () => window.removeEventListener('storage', syncLogout)
  }, [navigate])

  return <>{children}</>
}
