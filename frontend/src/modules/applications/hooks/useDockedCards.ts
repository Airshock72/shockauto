import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { headerFloatOffset } from 'src/modules/header/helpers'
import { prefersReducedMotion } from 'src/core/helpers/languageSwitcher.ts'
import {
  dockArcStrength,
  dockBlobRadii,
  dockDuration,
  dockEase,
  dockJelly,
  dockLiquidFrequency,
  dockLiquidId,
  dockLiquidScale,
  dockMinGutter,
  dockStretch,
  dockTilt
} from 'src/modules/applications/helpers'
import { useDockedCardsReducer } from 'src/modules/applications/store/dockedCards.ts'
import type { DockPoint, DockTransition } from 'src/modules/applications/types'

gsap.registerPlugin(useGSAP)

const dockCardSelector = '[data-dock-card]'

const getCards = (aside: HTMLElement) => Array.from(aside.querySelectorAll<HTMLElement>(dockCardSelector))

const getCenter = (rect: DOMRect): DockPoint => ({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })

const lerp = (from: number, to: number, progress: number) => from + (to - from) * progress

const getCurvePoint = (start: DockPoint, control: DockPoint, progress: number): DockPoint => {
  const inverse = 1 - progress
  return {
    x: inverse * inverse * start.x + 2 * inverse * progress * control.x,
    y: inverse * inverse * start.y + 2 * inverse * progress * control.y
  }
}

const restingRadius = '16px 16px 16px 16px / 16px 16px 16px 16px'

const getBlobRadius = (width: number, height: number) => {
  const [a, b, c, d, e, f, g, h] = dockBlobRadii
  return `${a * width}px ${b * width}px ${c * width}px ${d * width}px / ${e * height}px ${f * height}px ${g * height}px ${h * height}px`
}

const useDockedCards = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const asideRef = useRef<HTMLElement>(null)
  const liquidRef = useRef<SVGFEDisplacementMapElement>(null)
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null)
  const transitionRef = useRef<DockTransition | null>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const [state, dispatch] = useDockedCardsReducer()
  const { isDocked } = state

  useLayoutEffect(() => {
    const container = containerRef.current
    const aside = asideRef.current
    if (!container || !aside) return
    let docked: boolean | null = null

    const update = () => {
      const gutter = container.getBoundingClientRect().left
      aside.style.setProperty('--dock-gutter', `${gutter}px`)

      const shouldDock = gutter >= dockMinGutter && window.scrollY > headerFloatOffset
      if (shouldDock === docked) return

      const isInitial = docked === null
      docked = shouldDock
      transitionRef.current = isInitial || prefersReducedMotion()
        ? null
        : { rects: getCards(aside).map((card) => card.getBoundingClientRect()), height: aside.offsetHeight, isDocking: shouldDock }
      dispatch({ type: 'SET_DOCKED', payload: shouldDock })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [dispatch])

  useGSAP(
    () => {
      const aside = asideRef.current
      const transition = transitionRef.current
      transitionRef.current = null
      timelineRef.current?.progress(1).kill()
      timelineRef.current = null
      if (!aside || !transition) return

      const { rects, height, isDocking } = transition
      const cards = getCards(aside)
      const timeline = gsap.timeline({ onComplete: () => { timelineRef.current = null } })
      timelineRef.current = timeline

      cards.forEach((card, index) => {
        const first = rects[index]
        const last = card.getBoundingClientRect()
        if (!first || !last.height) return

        const side = index === 0 ? -1 : 1
        const firstCenter = getCenter(first)
        const lastCenter = getCenter(last)
        const start = { x: firstCenter.x - lastCenter.x, y: firstCenter.y - lastCenter.y }
        const bow = Math.abs(start.x) * dockArcStrength * side
        // Docking sweeps sideways then sinks; undocking rises then sweeps back, retracing the curve.
        const control = isDocking ? { x: bow, y: start.y } : { x: start.x + bow, y: 0 }
        const startScale = { x: first.width / last.width, y: first.height / last.height }
        const flight = { progress: 0 }

        gsap.set(card, { transformOrigin: '50% 50%', overflow: 'hidden', filter: `url(#${dockLiquidId})`, willChange: 'transform' })

        const applyFlight = () => {
          const { progress } = flight
          const point = getCurvePoint(start, control, progress)
          const wave = Math.sin(Math.PI * progress)
          gsap.set(card, {
            x: point.x,
            y: point.y,
            scaleX: lerp(startScale.x, 1, progress) * (1 + wave * dockStretch),
            scaleY: lerp(startScale.y, 1, progress) * (1 - wave * dockStretch),
            rotation: wave * dockTilt * side * (isDocking ? 1 : -1)
          })
        }
        applyFlight()

        timeline
          .to(flight, { progress: 1, duration: dockDuration, ease: dockEase, onUpdate: applyFlight }, 0)
          .to(card, {
            keyframes: { borderRadius: [restingRadius, getBlobRadius(last.width, last.height), restingRadius] },
            duration: dockDuration,
            ease: 'sine.inOut'
          }, 0)
          .to(card, {
            keyframes: { scaleX: [1, 1 + dockJelly, 1], scaleY: [1, 1 - dockJelly, 1] },
            duration: 0.7,
            ease: 'elastic.out(1, 0.4)'
          }, dockDuration)
          .set(card, { clearProps: 'transform,transformOrigin,overflow,filter,willChange,borderRadius' })
      })

      timeline.to(aside.querySelectorAll(`${dockCardSelector} > * > *`), {
        keyframes: { autoAlpha: [0.2, 0.2, 1] },
        duration: dockDuration,
        ease: 'sine.inOut',
        clearProps: 'opacity,visibility'
      }, 0)

      if (liquidRef.current && turbulenceRef.current) {
        const half = dockDuration / 2
        timeline
          .fromTo(liquidRef.current, { attr: { scale: 0 } }, { attr: { scale: dockLiquidScale }, duration: half, ease: 'sine.out' }, 0)
          .to(liquidRef.current, { attr: { scale: 0 }, duration: half, ease: 'sine.in' }, half)
          .fromTo(turbulenceRef.current, { attr: { baseFrequency: `${dockLiquidFrequency} ${dockLiquidFrequency * 2}` } }, {
            attr: { baseFrequency: `${dockLiquidFrequency * 2} ${dockLiquidFrequency}` },
            duration: dockDuration,
            ease: 'none'
          }, 0)
      }

      timeline.fromTo(aside, { height }, { height: aside.offsetHeight, duration: dockDuration, ease: dockEase, clearProps: 'height' }, 0)
    },
    { dependencies: [isDocked], scope: asideRef }
  )

  return { containerRef, asideRef, liquidRef, turbulenceRef, isDocked }
}

export default useDockedCards
