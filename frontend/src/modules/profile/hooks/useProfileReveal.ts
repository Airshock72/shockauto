import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { prefersReducedMotion } from 'src/core/helpers/languageSwitcher.ts'

gsap.registerPlugin(useGSAP)

const useProfileReveal = (isReady: boolean) => {
  const pageRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion()) return

      gsap.timeline()
        .from('[data-reveal]', { opacity: 0, y: 18, scale: 0.98, duration: 0.7, stagger: 0.08, ease: 'expo.out' })
        .from('[data-avatar]', { scale: 0.4, rotate: -25, duration: 0.8, ease: 'back.out(2)' }, 0.15).then()

      gsap.to('[data-avatar-ring]', { rotate: 360, duration: 8, ease: 'none', repeat: -1 }).then()
    },
    { dependencies: [isReady], scope: pageRef }
  )

  return pageRef
}

export default useProfileReveal
