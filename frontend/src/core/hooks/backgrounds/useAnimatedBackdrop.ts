import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import {
  animateBackdropOrbs,
  animateBackdropStreaks,
  backdropOrbs,
  createBackdropParallax
} from 'src/core/helpers/animatedBackdrop.ts'
import { prefersReducedMotion } from 'src/core/helpers/languageSwitcher.ts'

gsap.registerPlugin(useGSAP)

const useAnimatedBackdrop = () => {
  const backdropRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const backdrop = backdropRef.current
    if (!backdrop || prefersReducedMotion()) return

    animateBackdropOrbs(gsap.utils.toArray<HTMLElement>('[data-backdrop-orb]', backdrop))
    animateBackdropStreaks(gsap.utils.toArray<HTMLElement>('[data-backdrop-streak]', backdrop))

    const handlePointerMove = createBackdropParallax(
      gsap.utils.toArray<HTMLElement>('[data-backdrop-layer]', backdrop),
      backdropOrbs.map(({ depth }) => depth)
    )
    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, { scope: backdropRef })

  return backdropRef
}

export default useAnimatedBackdrop
