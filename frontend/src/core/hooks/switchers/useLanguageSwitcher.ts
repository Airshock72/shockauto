import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import type { Language } from 'src/i18n'
import { animateLanguageSwitch, LANGUAGE_OPTIONS, prefersReducedMotion } from 'src/core/helpers/languageSwitcher.ts'

gsap.registerPlugin(useGSAP)

const useLanguageSwitcher = () => {
  const { i18n, t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLSpanElement>(null)
  const hasMounted = useRef(false)

  const activeLanguage = (i18n.resolvedLanguage ?? 'ka') as Language
  const activeIndex = Math.max(0, LANGUAGE_OPTIONS.findIndex((option) => option.code === activeLanguage))

  useGSAP(
    () => {
      const container = containerRef.current
      const thumb = thumbRef.current
      if (!container || !thumb) return

      const target = container.querySelectorAll<HTMLButtonElement>('[data-language]')[activeIndex]
      if (!target) return

      const position = { x: target.offsetLeft, width: target.offsetWidth }

      if (!hasMounted.current || prefersReducedMotion()) {
        hasMounted.current = true
        gsap.set(thumb, position).then()
        return
      }

      animateLanguageSwitch(thumb, target.querySelector('[data-language-label]'), position).then()
    },
    { dependencies: [activeIndex], scope: containerRef }
  )

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
