import { Navigate, Outlet } from 'react-router-dom'
import LanguageSwitcher from 'src/core/components/switchers/LanguageSwitcher.tsx'
import ThemeSwitcher from 'src/core/components/switchers/ThemeSwitcher.tsx'
import ScrollRail from 'src/core/components/scrollbars/ScrollRail.tsx'

const PublicLayout = () => {
  const token = localStorage.getItem('token')

  if (token) return <Navigate to='/' replace />

  return (
    <div className='relative'>
      <div className='absolute top-4 left-4 z-50 flex items-center gap-2'>
        <ThemeSwitcher mini />
        <LanguageSwitcher mini />
      </div>

      <Outlet />
      <ScrollRail />
    </div>
  )
}

export default PublicLayout
