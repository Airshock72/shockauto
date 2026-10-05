import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { animateHeroIntro } from 'src/modules/dashboard/helpers'
import { prefersReducedMotion } from 'src/core/helpers/languageSwitcher.ts'

gsap.registerPlugin(useGSAP)

const useWelcomeHero = (greeting: string) => {
  const sectionRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    (_, contextSafe) => {
      const section = sectionRef.current
      const glow = glowRef.current
      if (!section || !glow || prefersReducedMotion()) return

      animateHeroIntro().then()

      if (!window.matchMedia('(pointer: fine)').matches) return

      gsap.set(glow, { xPercent: -50, yPercent: -50 }).then()
      const moveX = gsap.quickTo(glow, 'x', { duration: 0.7, ease: 'power3' })
      const moveY = gsap.quickTo(glow, 'y', { duration: 0.7, ease: 'power3' })

      const onMove = contextSafe!((event: PointerEvent) => {
        const bounds = section.getBoundingClientRect()
        moveX(event.clientX - bounds.left).then()
        moveY(event.clientY - bounds.top).then()
      })
      const onEnter = contextSafe!(() => gsap.to(glow, { opacity: 1, duration: 0.5 }))
      const onLeave = contextSafe!(() => gsap.to(glow, { opacity: 0, duration: 0.6 }))

      section.addEventListener('pointermove', onMove)
      section.addEventListener('pointerenter', onEnter)
      section.addEventListener('pointerleave', onLeave)

      return () => {
        section.removeEventListener('pointermove', onMove)
        section.removeEventListener('pointerenter', onEnter)
        section.removeEventListener('pointerleave', onLeave)
      }
    },
    { scope: sectionRef, dependencies: [greeting], revertOnUpdate: true }
  )

  return { sectionRef, glowRef }
}

export default useWelcomeHero
