import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useGSAP } from '@gsap/react'
import { prefersReducedMotion } from 'src/core/helpers/languageSwitcher.ts'
import { getMaxScroll } from 'src/core/helpers/scrollRail.ts'
import {
  backToTopOffset,
  getScrollUpDuration,
  progressCircumference,
  rollDistance,
  rollRotation,
  scrollSpinRatio,
  wheelCenter
} from 'src/core/helpers/backToTop.ts'
import type { BackToTop } from 'src/core/types/backToTop.ts'

gsap.registerPlugin(useGSAP, ScrollToPlugin)

const useBackToTop = (): BackToTop => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const progressRef = useRef<SVGCircleElement>(null)
  const arrowRef = useRef<HTMLSpanElement>(null)

  const { contextSafe } = useGSAP(
    () => {
      const button = buttonRef.current
      const progress = progressRef.current
      if (!button || !progress) return

      const reducedMotion = prefersReducedMotion()
      const spinners = button.querySelectorAll('[data-wheel-spin]')
      const svgOrigin = `${wheelCenter} ${wheelCenter}`
      gsap.set([...spinners, ...button.querySelectorAll('[data-wheel-burnout]')], { svgOrigin }).then()
      gsap.set(progress, { strokeDasharray: progressCircumference, strokeDashoffset: progressCircumference }).then()
      gsap.set(button, { autoAlpha: 0, x: reducedMotion ? 0 : rollDistance, rotation: reducedMotion ? 0 : rollRotation }).then()

      const spinTo = gsap.quickTo(spinners, 'rotation', { duration: reducedMotion ? 0 : 0.6, ease: 'power3.out' })
      const fillTo = gsap.quickTo(progress, 'strokeDashoffset', { duration: reducedMotion ? 0 : 0.35, ease: 'power3.out' })
      let isShown: boolean | null = null

      const toggle = (show: boolean) => {
        const isInitial = isShown === null
        isShown = show
        if (isInitial && !show) return

        gsap.to(button, {
          autoAlpha: show ? 1 : 0,
          x: show || reducedMotion ? 0 : rollDistance,
          rotation: show || reducedMotion ? 0 : rollRotation,
          duration: reducedMotion ? 0.2 : show ? 0.9 : 0.6,
          ease: show ? 'back.out(1.4)' : 'power2.in',
          overwrite: 'auto'
        }).then()
      }

      const sync = () => {
        const maxScroll = getMaxScroll()
        const shouldShow = window.scrollY > backToTopOffset
        if (shouldShow !== isShown) toggle(shouldShow)

        const progressRatio = maxScroll > 1 ? gsap.utils.clamp(0, 1, window.scrollY / maxScroll) : 0
        spinTo(-window.scrollY * scrollSpinRatio).then()
        fillTo(progressCircumference * (1 - progressRatio)).then()
      }

      window.addEventListener('scroll', sync, { passive: true })
      window.addEventListener('resize', sync)
      sync()

      return () => {
        window.removeEventListener('scroll', sync)
        window.removeEventListener('resize', sync)
      }
    },
    { scope: buttonRef }
  )

  const handleClick = () => {
    const button = buttonRef.current
    const arrow = arrowRef.current
    if (!button) return

    gsap.killTweensOf(window)
    if (prefersReducedMotion()) {
      window.scrollTo(0, 0)
      return
    }

    const duration = getScrollUpDuration(window.scrollY)

    contextSafe(() => {
      gsap.timeline()
        .fromTo(button.querySelectorAll('[data-wheel-burnout]'), { rotation: 0 }, { rotation: -1080, duration, ease: 'power2.inOut' }, 0)
        .fromTo(button.querySelectorAll('[data-smoke]'), { x: 0, y: 0, scale: 0.4, autoAlpha: 0.8 }, {
          x: (index: number) => (index % 2 === 0 ? 1 : -1) * (14 + index * 6),
          y: (index: number) => 8 + index * 4,
          scale: 1.8,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.07,
          ease: 'power2.out'
        }, 0)
        .fromTo(arrow, { y: 0 }, { keyframes: { y: [0, -16, 12, 0], autoAlpha: [1, 0, 0, 1] }, duration: 0.7, ease: 'power2.inOut' }, 0)
        .to(window, { scrollTo: { y: 0, autoKill: true }, duration, ease: 'power3.inOut' }, 0)
    })()
  }

  return { buttonRef, progressRef, arrowRef, handleClick }
}

export default useBackToTop
