import { lazy } from 'react'
import type { RouteType } from 'src/api/core'

const routes: Array<RouteType> = [
  {
    path: '/applications/create',
    isPublic: false,
    element: lazy(() => import('src/modules/applications/views/CreateOrEditApplication.tsx'))
  },
  {
    path: '/applications/:id/edit',
    isPublic: false,
    element: lazy(() => import('src/modules/applications/views/CreateOrEditApplication.tsx'))
  }
]

export default routes
