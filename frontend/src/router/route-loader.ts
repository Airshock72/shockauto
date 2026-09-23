import type { RouteType } from 'src/api/core'

export const routesFromContext = (): Array<RouteType> => {
  const moduleRoutes: Array<RouteType> = []

  const routeModules = import.meta.glob('../**/routes.ts', {
    eager: true
  }) as Record<string, { default: Array<RouteType> }>

  Object.values(routeModules).forEach((module) => {
    if (Array.isArray(module.default)) {
      moduleRoutes.push(...module.default)
    }
  })

  return moduleRoutes
}