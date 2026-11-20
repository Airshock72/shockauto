import type { CSSProperties, PointerEventHandler, RefObject } from 'react'

export interface TruncatedTextProps {
  readonly text: string
  readonly className?: string
}

export interface TruncatedTooltip {
  readonly textRef: RefObject<HTMLSpanElement | null>
  readonly tooltipRef: RefObject<HTMLSpanElement | null>
  readonly isOpen: boolean
  readonly tooltipStyle: CSSProperties
  readonly onPointerEnter: PointerEventHandler<HTMLSpanElement>
  readonly onPointerLeave: PointerEventHandler<HTMLSpanElement>
  readonly onPointerUp: PointerEventHandler<HTMLSpanElement>
}
