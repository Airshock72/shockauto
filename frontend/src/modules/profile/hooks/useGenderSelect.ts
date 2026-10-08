import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { animateLanguageSwitch, getThumbPosition, prefersReducedMotion } from 'src/core/helpers/languageSwitcher.ts'

gsap.registerPlugin(useGSAP)

const useGenderSelect = (value: string) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLSpanElement>(null)
  const valueRef = useRef('')

  const getOption = (option: string) =>
    containerRef.current?.querySelector<HTMLElement>(`[data-gender="${option}"]`)

  useGSAP(
    () => {
      const hadValue = Boolean(valueRef.current)
      valueRef.current = value
      const thumb = thumbRef.current
      const target = getOption(value)
      if (!thumb) return

      if (!target) {
        gsap.set(thumb, { opacity: 0 }).then()
        return
      }

      const position = getThumbPosition(target)

      if (prefersReducedMotion()) {
        gsap.set(thumb, { ...position, opacity: 1 }).then()
        return
      }

      if (!hadValue) {
        gsap.set(thumb, position).then()
        gsap.fromTo(thumb, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }).then()
        return
      }

      animateLanguageSwitch(thumb, target.querySelector('[data-gender-label]'), position).then()
    },
    { dependencies: [value], scope: containerRef }
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver(() => {
      const target = getOption(valueRef.current)
      if (target && thumbRef.current) gsap.set(thumbRef.current, getThumbPosition(target)).then()
    })

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return { containerRef, thumbRef }
}

export default useGenderSelect
