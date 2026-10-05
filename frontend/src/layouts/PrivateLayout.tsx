import { Outlet } from 'react-router-dom'
import useRequireAuth from 'src/core/hooks/useRequireAuth.tsx'
import Header from 'src/modules/header/views/Header.tsx'

const PrivateLayout = () => {
  const authRedirect = useRequireAuth()

  if (authRedirect) return authRedirect

  return (
    <div className='flex min-h-dvh flex-col bg-aurora'>
      <Header />
      <Outlet />
    </div>
  )
}

export default PrivateLayout
