import { useRef } from 'react'
import type { Slide } from 'src/core/types/ImageSlider.ts'
import { animateCarAccent, defaultCarAccent } from 'src/core/helpers/carAccent.ts'
import { prefersReducedMotion } from 'src/core/helpers/languageSwitcher.ts'

const useCarAccent = () => {
  const pageRef = useRef<HTMLElement>(null)
  const hasMounted = useRef(false)
  const handleSlideChange = (slide: Slide) => {
    const page = pageRef.current
    if (!page) return

    const instant = !hasMounted.current || prefersReducedMotion()
    hasMounted.current = true
    animateCarAccent(page, slide.accent ?? defaultCarAccent, instant).then()
  }

  return { pageRef, handleSlideChange }
}

export default useCarAccent
