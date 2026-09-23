import type { ComponentType } from 'react'

export interface RouteType {
    readonly exact?: boolean
    readonly path: string
    readonly isPublic: boolean
    readonly element: ComponentType
}