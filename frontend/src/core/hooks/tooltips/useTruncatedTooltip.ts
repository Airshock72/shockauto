import { type CSSProperties, type PointerEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { TruncatedTooltip } from 'src/core/types/truncatedText.ts'

const viewportMargin = 12
const anchorGap = 8
const touchHideDelay = 2500

const isTruncated = (element: HTMLElement) => element.scrollWidth > element.clientWidth

const useTruncatedTooltip = (): TruncatedTooltip => {
  const textRef = useRef<HTMLSpanElement>(null)
  const tooltipRef = useRef<HTMLSpanElement>(null)
  const hideTimerRef = useRef<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [tooltipStyle, setTooltipStyle] = useState<CSSProperties>({ visibility: 'hidden' })

  const clearHideTimer = () => {
    if (hideTimerRef.current !== null) window.clearTimeout(hideTimerRef.current)
    hideTimerRef.current = null
  }

  const close = useCallback(() => {
    clearHideTimer()
    setIsOpen(false)
    setTooltipStyle({ visibility: 'hidden' })
  }, [])

  const open = () => {
    const text = textRef.current
    if (text && isTruncated(text)) setIsOpen(true)
  }

  const onPointerEnter = (event: PointerEvent<HTMLSpanElement>) => {
    if (event.pointerType === 'mouse') open()
  }

  const onPointerLeave = (event: PointerEvent<HTMLSpanElement>) => {
    if (event.pointerType === 'mouse') close()
  }

  const onPointerUp = (event: PointerEvent<HTMLSpanElement>) => {
    if (event.pointerType === 'mouse') return
    open()
    clearHideTimer()
    hideTimerRef.current = window.setTimeout(close, touchHideDelay)
  }

  useLayoutEffect(() => {
    const text = textRef.current
    const tooltip = tooltipRef.current
    if (!isOpen || !text || !tooltip) return

    const anchor = text.getBoundingClientRect()
    const { width, height } = tooltip.getBoundingClientRect()
    const maxLeft = window.innerWidth - viewportMargin - width
    const left = Math.min(Math.max(anchor.left + anchor.width / 2 - width / 2, viewportMargin), maxLeft)
    const fitsAbove = anchor.top - anchorGap - height >= viewportMargin
    const top = fitsAbove ? anchor.top - anchorGap - height : anchor.bottom + anchorGap

    setTooltipStyle({ left, top })
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleOutsidePointer = (event: Event) => {
      if (!textRef.current?.contains(event.target as Node)) close()
    }

    window.addEventListener('scroll', close, { capture: true, passive: true })
    window.addEventListener('resize', close)
    document.addEventListener('pointerdown', handleOutsidePointer)

    return () => {
      window.removeEventListener('scroll', close, { capture: true })
      window.removeEventListener('resize', close)
      document.removeEventListener('pointerdown', handleOutsidePointer)
    }
  }, [isOpen, close])

  useEffect(() => clearHideTimer, [])

  return { textRef, tooltipRef, isOpen, tooltipStyle, onPointerEnter, onPointerLeave, onPointerUp }
}

export default useTruncatedTooltip
