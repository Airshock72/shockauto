import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { prefersReducedMotion } from 'src/core/helpers/languageSwitcher.ts'

gsap.registerPlugin(useGSAP)

const useAuthReveal = () => {
  const cardRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from(cardRef.current, { opacity: 0, y: 24, scale: 0.97, duration: 0.8, clearProps: 'opacity,transform' })
        .from('[data-brand]', { scale: 0.5, rotate: -20, opacity: 0, duration: 0.7, ease: 'back.out(2.2)' }, 0.1)
        .from('[data-reveal]', { opacity: 0, y: 12, filter: 'blur(4px)', duration: 0.6, stagger: 0.07, clearProps: 'opacity,transform,filter' }, 0.2).then()
    },
    { scope: cardRef }
  )

  return cardRef
}

export default useAuthReveal
