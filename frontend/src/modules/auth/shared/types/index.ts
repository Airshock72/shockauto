import type { ReactNode, RefObject } from 'react'

export interface AuthShellProps {
  readonly pageRef: RefObject<HTMLElement | null>
  readonly title: string
  readonly subtitle: string
  readonly showcase: ReactNode
  readonly footer: ReactNode
  readonly children: ReactNode
  readonly className?: string
}
