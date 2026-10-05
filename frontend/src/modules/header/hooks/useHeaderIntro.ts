import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { animateHeaderIntro } from 'src/modules/header/helpers'
import { prefersReducedMotion } from 'src/core/helpers/languageSwitcher.ts'

gsap.registerPlugin(useGSAP)

const useHeaderIntro = () => {
  const headerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!prefersReducedMotion()) animateHeaderIntro().then()
  }, { scope: headerRef })

  return headerRef
}

export default useHeaderIntro
