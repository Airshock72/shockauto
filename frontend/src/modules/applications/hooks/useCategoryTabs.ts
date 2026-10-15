import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { animateLanguageSwitch, getThumbPosition, prefersReducedMotion } from 'src/core/helpers/languageSwitcher.ts'
import type { ApplicationCategory, CategoryTabs } from 'src/modules/applications/types'

gsap.registerPlugin(useGSAP)

const useCategoryTabs = (value: ApplicationCategory): CategoryTabs => {
  const containerRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLSpanElement>(null)
  const valueRef = useRef<ApplicationCategory | null>(null)

  const getOption = (option: ApplicationCategory) =>
    containerRef.current?.querySelector<HTMLElement>(`[data-category="${option}"]`)

  useGSAP(
    () => {
      const hadValue = Boolean(valueRef.current)
      valueRef.current = value
      const thumb = thumbRef.current
      const target = getOption(value)
      if (!thumb || !target) return

      const position = getThumbPosition(target)

      if (!hadValue || prefersReducedMotion()) {
        gsap.set(thumb, { ...position, opacity: 1 }).then()
        return
      }

      animateLanguageSwitch(thumb, target.querySelector('[data-category-label]'), position).then()
    },
    { dependencies: [value], scope: containerRef }
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver(() => {
      const target = valueRef.current && getOption(valueRef.current)
      if (target && thumbRef.current) gsap.set(thumbRef.current, getThumbPosition(target)).then()
    })

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return { containerRef, thumbRef }
}

export default useCategoryTabs
