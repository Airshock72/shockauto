import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { headerFloatOffset } from 'src/modules/header/helpers'
import { prefersReducedMotion } from 'src/core/helpers/languageSwitcher.ts'
import { dockDuration, dockMinGutter } from 'src/modules/applications/helpers'
import { useDockedCardsReducer } from 'src/modules/applications/store/dockedCards.ts'

interface DockTransition {
  readonly rects: Array<DOMRect>
  readonly height: number
  readonly isDocking: boolean
}

const dockCardSelector = '[data-dock-card]'

const getCards = (aside: HTMLElement) => Array.from(aside.querySelectorAll<HTMLElement>(dockCardSelector))

const useDockedCards = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const asideRef = useRef<HTMLElement>(null)
  const transitionRef = useRef<DockTransition | null>(null)
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

  useLayoutEffect(() => {
    const aside = asideRef.current
    const transition = transitionRef.current
    transitionRef.current = null
    if (!aside || !transition) return

    const { rects, height, isDocking } = transition
    const timeline = gsap.timeline({ defaults: { duration: dockDuration } })

    getCards(aside).forEach((card, index) => {
      const first = rects[index]
      const last = card.getBoundingClientRect()
      if (!first || !last.height) return

      // Left card turns counter-clockwise on the way down, right card clockwise; reversed on the way back.
      const side = index === 0 ? 1 : -1
      const rotation = (isDocking ? 90 : -90) * side

      gsap.set(card, {
        x: first.left + first.width / 2 - (last.left + last.width / 2),
        y: first.top + first.height / 2 - (last.top + last.height / 2),
        rotation,
        scale: first.width / last.height,
        transformOrigin: '50% 50%'
      })

      timeline
        .to(card, { rotation: 0, scale: 1, ease: 'back.out(1.1)' }, 0)
        .to(card, { x: 0, ease: isDocking ? 'power3.out' : 'power2.in' }, 0)
        .to(card, { y: 0, ease: isDocking ? 'power2.in' : 'power3.out' }, 0)
        .set(card, { clearProps: 'transform,transformOrigin' }, dockDuration)
    })

    timeline.fromTo(aside, { height }, { height: aside.offsetHeight, ease: 'power3.inOut', clearProps: 'height' }, 0)

    return () => {
      timeline.progress(1).kill()
    }
  }, [isDocked])

  return { containerRef, asideRef, isDocked }
}

export default useDockedCards
