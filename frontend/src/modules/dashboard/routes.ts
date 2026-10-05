import { lazy } from 'react'
import type { RouteType } from 'src/api/core'

const routes: Array<RouteType> = [
  {
    path: '/',
    isPublic: false,
    element: lazy(() => import('src/modules/dashboard/views/IndexPage.tsx'))
  }
]

export default routes
