import type { RefObject } from 'react'

export interface BackToTop {
  readonly buttonRef: RefObject<HTMLButtonElement | null>
  readonly progressRef: RefObject<SVGCircleElement | null>
  readonly arrowRef: RefObject<HTMLSpanElement | null>
  readonly handleClick: () => void
}
