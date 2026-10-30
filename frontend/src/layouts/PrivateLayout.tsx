import { Outlet } from 'react-router-dom'
import useRequireAuth from 'src/core/hooks/useRequireAuth.tsx'
import AnimatedBackdrop from 'src/core/components/backgrounds/AnimatedBackdrop.tsx'
import Header from 'src/modules/header/views/Header.tsx'

const PrivateLayout = () => {
  const authRedirect = useRequireAuth()

  if (authRedirect) return authRedirect

  return (
    <div className='relative isolate flex min-h-dvh flex-col'>
      <AnimatedBackdrop />
      <Header />
      <Outlet />
    </div>
  )
}

export default PrivateLayout
