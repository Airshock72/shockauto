import { useRef } from 'react'
import type { PointerEvent } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import {
  CLIP_FULL,
  clipFrom,
  directionBetween,
  DRAG_DEAD_ZONE,
  FLICK_VELOCITY,
  INCOMING_SCALE,
  INCOMING_SHIFT,
  OUTGOING_SHIFT,
  prefersReducedMotion,
  SLIDE_DURATION,
  type SlideDirection,
  SNAP_DURATION,
  SWIPE_THRESHOLD,
  wrapIndex
} from 'src/core/helpers/imageSlider.ts'

gsap.registerPlugin(useGSAP)

interface UseImageSliderAnimationParams {
  readonly count: number
  readonly activeIndex: number
  readonly interval: number
  readonly goTo: (index: number) => void
  readonly setPaused: (isPaused: boolean) => void
}

const useImageSliderAnimation = ({ count, activeIndex, interval, goTo, setPaused }: UseImageSliderAnimationParams) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const previousIndex = useRef(activeIndex)

  const drag = useRef({
    active: false,
    startX: 0,
    width: 1,
    direction: 0 as SlideDirection | 0,
    progress: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    committed: false
  })

  const getSlides = () => gsap.utils.toArray<HTMLElement>('[data-slide]', containerRef.current)
  const getImage = (slide?: HTMLElement) => slide?.querySelector('img') ?? null

  const zoomDuration = (interval + 1500) / 1000

  useGSAP(
    () => {
      getSlides().forEach((slide, index) => {
        const isActive = index === activeIndex
        gsap.set(slide, { autoAlpha: isActive ? 1 : 0, zIndex: isActive ? 1 : 0, clipPath: CLIP_FULL }).then()
      })

      const image = getImage(getSlides()[activeIndex])
      if (image && !prefersReducedMotion()) {
        gsap.fromTo(image, { scale: 1.1 }, { scale: 1, duration: zoomDuration, ease: 'power2.out' }).then()
      }
    },
    { scope: containerRef }
  )

  useGSAP(
    () => {
      const from = previousIndex.current
      const to = activeIndex
      if (from === to) return
      previousIndex.current = to

      const state = drag.current
      const wasDragged = state.committed
      const direction = wasDragged && state.direction !== 0 ? state.direction : directionBetween(from, to, count)
      state.committed = false

      const motion = prefersReducedMotion() ? 0 : 1
      const slides = getSlides()
      const incoming = slides[to]
      const outgoing = slides[from]
      const incomingImage = getImage(incoming)
      const outgoingImage = getImage(outgoing)

      gsap.killTweensOf([incoming, outgoing, incomingImage, outgoingImage].filter(Boolean))

      slides.forEach((slide, index) => {
        if (index !== to && index !== from) gsap.set(slide, { autoAlpha: 0, zIndex: 0 }).then()
      })

      gsap.set(outgoing, { zIndex: 1 }).then()
      if (!wasDragged) gsap.set(incoming, { clipPath: clipFrom(direction, 0) }).then()
      gsap.set(incoming, { autoAlpha: 1, zIndex: 2 }).then()

      gsap.to(incoming, {
        clipPath: CLIP_FULL,
        duration: (wasDragged ? SLIDE_DURATION * 0.6 : SLIDE_DURATION) * motion,
        ease: wasDragged ? 'expo.out' : 'expo.inOut',
        onComplete: () => {
          gsap.set(outgoing, { autoAlpha: 0, zIndex: 0, clipPath: CLIP_FULL }).then()
          if (outgoingImage) gsap.set(outgoingImage, { xPercent: 0, scale: 1 }).then()
        }
      }).then()

      if (incomingImage) {
        if (!wasDragged) gsap.set(incomingImage, { scale: INCOMING_SCALE, xPercent: INCOMING_SHIFT * direction }).then()
        gsap.to(incomingImage, { xPercent: 0, duration: SLIDE_DURATION * 1.3 * motion, ease: 'expo.out' }).then()
        gsap.to(incomingImage, { scale: 1, duration: zoomDuration * motion, ease: 'power2.out' }).then()
      }

      if (outgoingImage) {
        gsap.to(outgoingImage, { xPercent: -OUTGOING_SHIFT * direction, duration: SLIDE_DURATION * motion, ease: 'expo.inOut' }).then()
      }
    },
    { dependencies: [activeIndex], scope: containerRef }
  )

  const { contextSafe } = useGSAP({ scope: containerRef })

  const renderDrag = (direction: SlideDirection, progress: number) => {
    const slides = getSlides()
    const target = slides[wrapIndex(activeIndex + direction, count)]
    const targetImage = getImage(target)
    const currentImage = getImage(slides[activeIndex])

    gsap.set(target, { autoAlpha: 1, zIndex: 2, clipPath: clipFrom(direction, progress) }).then()
    if (targetImage) {
      gsap.set(targetImage, {
        scale: INCOMING_SCALE - (INCOMING_SCALE - 1) * 0.5 * progress,
        xPercent: INCOMING_SHIFT * direction * (1 - progress)
      }).then()
    }
    if (currentImage) gsap.set(currentImage, { xPercent: -OUTGOING_SHIFT * direction * progress }).then()
  }

  const hideDragTarget = (direction: SlideDirection) => {
    const target = getSlides()[wrapIndex(activeIndex + direction, count)]
    gsap.set(target, { autoAlpha: 0, zIndex: 0, clipPath: CLIP_FULL }).then()
  }

  const snapBack = (direction: SlideDirection) => {
    contextSafe(() => {
      const slides = getSlides()
      const target = slides[wrapIndex(activeIndex + direction, count)]
      const currentImage = getImage(slides[activeIndex])

      gsap.to(target, {
        clipPath: clipFrom(direction, 0),
        duration: SNAP_DURATION,
        ease: 'expo.out',
        onComplete: () => hideDragTarget(direction)
      }).then()
      if (currentImage) gsap.to(currentImage, { xPercent: 0, duration: SNAP_DURATION, ease: 'expo.out' }).then()
    })()
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (count < 2 || event.button !== 0) return
    if (event.target instanceof Element && event.target.closest('button')) return
    if (gsap.isTweening(getSlides()[activeIndex])) return

    const state = drag.current
    state.active = true
    state.startX = event.clientX
    state.lastX = event.clientX
    state.lastTime = event.timeStamp
    state.width = event.currentTarget.clientWidth || 1
    state.direction = 0
    state.progress = 0
    state.velocity = 0

    event.currentTarget.setPointerCapture(event.pointerId)
    event.currentTarget.dataset.dragging = ''
    setPaused(true)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const state = drag.current
    if (!state.active) return

    const elapsed = event.timeStamp - state.lastTime
    if (elapsed > 0) state.velocity = (event.clientX - state.lastX) / elapsed
    state.lastX = event.clientX
    state.lastTime = event.timeStamp

    const dx = event.clientX - state.startX
    const direction: SlideDirection | 0 = Math.abs(dx) < DRAG_DEAD_ZONE ? 0 : dx < 0 ? 1 : -1

    if (direction !== state.direction && state.direction !== 0) hideDragTarget(state.direction)
    state.direction = direction
    if (direction === 0) return

    state.progress = Math.min(1, Math.abs(dx) / state.width)
    renderDrag(direction, state.progress)
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const state = drag.current
    if (!state.active) return

    state.active = false
    delete event.currentTarget.dataset.dragging
    if (event.pointerType !== 'mouse') setPaused(false)

    const { direction, progress, velocity } = state
    if (direction === 0) return

    // Flick velocity is negative when moving left (towards "next")
    const isFlick = -velocity * direction > FLICK_VELOCITY
    if (progress > SWIPE_THRESHOLD || isFlick) {
      state.committed = true
      goTo(activeIndex + direction)
      return
    }

    snapBack(direction)
  }

  return {
    containerRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp
  }
}

export default useImageSliderAnimation
