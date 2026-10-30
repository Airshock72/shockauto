import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { createHeaderFloat, headerFloatOffset } from 'src/modules/header/helpers'
import { prefersReducedMotion } from 'src/core/helpers/languageSwitcher.ts'

gsap.registerPlugin(useGSAP)

const desktopQuery = '(min-width: 48rem)'

const useHeaderFloat = () => {
  const shellRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const shell = shellRef.current
    if (!shell) return

    const mm = gsap.matchMedia()
    mm.add({ isDesktop: desktopQuery, isMobile: `not all and ${desktopQuery}` }, (context) => {
      const { isDesktop } = context.conditions as { isDesktop: boolean }
      const timeline = isDesktop ? createHeaderFloat(shell) : null
      let isFloating: boolean | null = null

      const update = () => {
        const shouldFloat = window.scrollY > headerFloatOffset
        if (shouldFloat === isFloating) return

        const isInitial = isFloating === null
        isFloating = shouldFloat
        shell.dataset.floating = String(shouldFloat)
        if (!timeline) return
        if (isInitial || prefersReducedMotion()) timeline.progress(shouldFloat ? 1 : 0).then()
        else if (shouldFloat) timeline.play().then()
        else timeline.reverse().then()
      }

      update()
      window.addEventListener('scroll', update, { passive: true })

      return () => {
        window.removeEventListener('scroll', update)
        shell.dataset.floating = 'false'
      }
    })

    return () => mm.revert()
  }, { scope: shellRef })

  return shellRef
}

export default useHeaderFloat
