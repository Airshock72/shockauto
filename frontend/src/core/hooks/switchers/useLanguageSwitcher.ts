import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import type { Language } from 'src/i18n'
import {
  animateLanguageSwitch,
  getThumbPosition,
  languageOptions,
  prefersReducedMotion
} from 'src/core/helpers/languageSwitcher.ts'

gsap.registerPlugin(useGSAP)

const useLanguageSwitcher = () => {
  const { i18n, t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLSpanElement>(null)
  const hasMounted = useRef(false)

  const activeLanguage = (i18n.resolvedLanguage ?? 'ka') as Language
  const activeIndex = Math.max(0, languageOptions.findIndex((option) => option.code === activeLanguage))
  const activeIndexRef = useRef(activeIndex)

  const getActiveButton = (index: number) =>
    containerRef.current?.querySelectorAll<HTMLButtonElement>('[data-language]')[index]

  useGSAP(
    () => {
      activeIndexRef.current = activeIndex
      const thumb = thumbRef.current
      const target = getActiveButton(activeIndex)
      if (!thumb || !target) return

      const position = getThumbPosition(target)

      if (!hasMounted.current || prefersReducedMotion()) {
        hasMounted.current = true
        gsap.set(thumb, position).then()
        return
      }

      animateLanguageSwitch(thumb, target.querySelector('[data-language-label]'), position).then()
    },
    { dependencies: [activeIndex], scope: containerRef }
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let isInitialCallback = true
    const observer = new ResizeObserver(() => {
      if (isInitialCallback) {
        isInitialCallback = false
        return
      }

      const target = getActiveButton(activeIndexRef.current)
      if (target && thumbRef.current) gsap.set(thumbRef.current, getThumbPosition(target)).then()
    })

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  const handleSelect = (language: Language) => {
    if (language !== activeLanguage) i18n.changeLanguage(language).then()
  }

  return {
    containerRef,
    thumbRef,
    activeLanguage,
    label: t('common.changeLanguage'),
    handleSelect
  }
}

export default useLanguageSwitcher
