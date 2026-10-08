import { lazy } from 'react'
import type { RouteType } from 'src/api/core'

const routes: Array<RouteType> = [
  {
    path: '/profile',
    isPublic: false,
    element: lazy(() => import('src/modules/profile/views/IndexPage.tsx'))
  }
]

export default routes