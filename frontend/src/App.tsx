import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import PageLoader from 'src/core/components/Loadings/PageLoader.tsx'
import PrivateLayout from 'src/layouts/PrivateLayout.tsx'
import PublicLayout from 'src/layouts/PublicLayout.tsx'
import { routes } from 'src/router/routes.ts'
import NotFoundPage from 'src/modules/notFound/views/IndexPage.tsx'

const Login = lazy(() => import('src/modules/auth/login/views/IndexPage.tsx'))
const Register = lazy(() => import('src/modules/auth/register/views/IndexPage.tsx'))

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PrivateLayout />}>
        {routes.map((el, index) => (
          <Route
            key={index}
            path={el.path}
            element={
              <Suspense fallback={<PageLoader />}>
                <el.element />
              </Suspense>
            }
          />
        ))}
        <Route path='*' element={<NotFoundPage />} />
      </Route>

      <Route element={<PublicLayout />}>
        <Route
          path='/login'
          element={
            <Suspense fallback={<PageLoader />}>
              <Login />
            </Suspense>
          }
        />
        <Route path='/reset-password' element={<div>Reset Password Page</div>} />
        <Route
          path='/register'
          element={
            <Suspense fallback={<PageLoader />}>
              <Register />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

export default AppRouter
