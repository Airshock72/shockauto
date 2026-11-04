import { type PointerEvent, useRef } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useGSAP } from '@gsap/react'
import useThreeStage from 'src/core/hooks/three/useThreeStage.ts'
import { prefersReducedMotion } from 'src/core/helpers/languageSwitcher.ts'
import { createScrollWheel, getMaxScroll } from 'src/core/helpers/scrollRail.ts'
import type { ScrollRail } from 'src/core/types/scrollRail.ts'

gsap.registerPlugin(useGSAP, ScrollToPlugin)

const useScrollRail = (): ScrollRail => {
  const railRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)
  const dragOffsetRef = useRef<number | null>(null)

  const getTravel = () => (thumbRef.current ? Number(gsap.getProperty(thumbRef.current, 'y')) || 0 : 0)
  const getTrackLength = () => (railRef.current?.clientHeight ?? 0) - (thumbRef.current?.offsetHeight ?? 0)

  const { containerRef: wheelRef } = useThreeStage(
    (stage, contextSafe) => createScrollWheel(stage, contextSafe, { getTravel, reducedMotion: prefersReducedMotion() }),
    { fov: 30, maxPixelRatio: 2 }
  )

  const { contextSafe } = useGSAP(
    () => {
      const rail = railRef.current
      const thumb = thumbRef.current
      const fill = fillRef.current
      if (!rail || !thumb || !fill) return

      const root = document.documentElement
      const previousScrollbarWidth = root.style.scrollbarWidth
      root.style.scrollbarWidth = 'none'

      const duration = prefersReducedMotion() ? 0 : 0.35
      const moveThumb = gsap.quickTo(thumb, 'y', { duration, ease: 'power3.out' })
      const fillTo = gsap.quickTo(fill, 'scaleY', { duration, ease: 'power3.out' })
      gsap.set(fill, { scaleY: 0, transformOrigin: '50% 0%' }).then()
      let isScrollable: boolean | null = null

      const sync = () => {
        const maxScroll = getMaxScroll()
        const scrollable = maxScroll > 1

        if (scrollable !== isScrollable) {
          isScrollable = scrollable
          gsap.to(rail, { autoAlpha: scrollable ? 1 : 0, x: scrollable ? 0 : 12, duration: 0.4, ease: 'power3.out', overwrite: 'auto' }).then()
        }

        const progress = scrollable ? gsap.utils.clamp(0, 1, window.scrollY / maxScroll) : 0
        moveThumb(progress * getTrackLength()).then()
        fillTo(progress).then()
      }

      const resizeObserver = new ResizeObserver(sync)
      resizeObserver.observe(document.body)
      resizeObserver.observe(rail)
      window.addEventListener('scroll', sync, { passive: true })
      sync()

      return () => {
        resizeObserver.disconnect()
        window.removeEventListener('scroll', sync)
        root.style.scrollbarWidth = previousScrollbarWidth
      }
    },
    { scope: railRef }
  )

  const scrollToPointer = (clientY: number, grabOffset: number, animate: boolean) => {
    const rail = railRef.current
    if (!rail) return

    const trackLength = getTrackLength()
    const progress = trackLength > 0 ? gsap.utils.clamp(0, 1, (clientY - rail.getBoundingClientRect().top - grabOffset) / trackLength) : 0
    const target = progress * getMaxScroll()

    if (animate && !prefersReducedMotion()) {
      contextSafe(() => gsap.to(window, { scrollTo: { y: target, autoKill: true }, duration: 0.9, ease: 'power3.inOut', overwrite: 'auto' }).then())()
    } else {
      gsap.killTweensOf(window)
      window.scrollTo(0, target)
    }
  }

  const handleRailPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || event.target === thumbRef.current || thumbRef.current?.contains(event.target as Node)) return
    scrollToPointer(event.clientY, (thumbRef.current?.offsetHeight ?? 0) / 2, true)
  }

  const handleThumbPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return

    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    dragOffsetRef.current = event.clientY - event.currentTarget.getBoundingClientRect().top
    const thumb = event.currentTarget
    contextSafe(() => gsap.to(thumb, { scale: 1.25, duration: 0.3, ease: 'back.out(3)', overwrite: 'auto' }).then())()
  }

  const handleThumbPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragOffsetRef.current === null) return
    scrollToPointer(event.clientY, dragOffsetRef.current, false)
  }

  const handleThumbPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragOffsetRef.current === null) return

    dragOffsetRef.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    const thumb = event.currentTarget
    contextSafe(() => gsap.to(thumb, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' }).then())()
  }

  return {
    railRef,
    thumbRef,
    fillRef,
    wheelRef,
    handleRailPointerDown,
    handleThumbPointerDown,
    handleThumbPointerMove,
    handleThumbPointerUp
  }
}

export default useScrollRail
