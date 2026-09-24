import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import PageLoader from 'src/core/components/Loadings/PageLoader.tsx'
import PrivateLayout from 'src/layouts/PrivateLayout.tsx'
import PublicLayout from 'src/layouts/PublicLayout.tsx'
import { routes } from 'src/router/routes.ts'

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
      </Route>

      <Route element={<PublicLayout />}>
        <Route path='/login' element={<div>Register Page</div>} />
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