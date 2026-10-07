import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import useTheme from 'src/core/hooks/useTheme.ts'
import { animateThemeSwitch } from 'src/core/helpers/themeSwitcher.ts'
import { prefersReducedMotion } from 'src/core/helpers/languageSwitcher.ts'
import { getElementCenter, spreadThemeChange } from 'src/core/helpers/themeTransition.ts'

gsap.registerPlugin(useGSAP)

const useThemeSwitcher = () => {
  const { t } = useTranslation()
  const { resolvedTheme, toggleTheme } = useTheme()
  const trackRef = useRef<HTMLButtonElement>(null)
  const hasMounted = useRef(false)

  const isDark = resolvedTheme === 'dark'

  useGSAP(
    () => {
      const track = trackRef.current
      if (!track) return

      const instant = !hasMounted.current || prefersReducedMotion()
      hasMounted.current = true
      animateThemeSwitch(track, isDark, instant)
    },
    { dependencies: [isDark], scope: trackRef }
  )

  const handleToggle = () => {
    const track = trackRef.current
    if (!track) return toggleTheme()

    spreadThemeChange(getElementCenter(track), toggleTheme)
  }

  return {
    trackRef,
    isDark,
    label: t(isDark ? 'theme.switchToLight' : 'theme.switchToDark'),
    toggleTheme: handleToggle
  }
}

export default useThemeSwitcher
