import type { RefObject } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { animateMenuReveal } from 'src/modules/header/helpers'
import { prefersReducedMotion } from 'src/core/helpers/languageSwitcher.ts'

gsap.registerPlugin(useGSAP)

const useMenuReveal = (panelRef: RefObject<HTMLElement | null>, isOpen: boolean, transformOrigin = 'top right') => {
  useGSAP(() => {
    const panel = panelRef.current
    if (isOpen && panel && !prefersReducedMotion()) animateMenuReveal(panel, transformOrigin).then()
  }, { dependencies: [isOpen] })
}

export default useMenuReveal
