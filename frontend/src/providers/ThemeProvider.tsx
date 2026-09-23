import type { ReactNode } from 'react'
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import {
  type ResolvedTheme,
  type Theme,
  THEME_STORAGE_KEY,
  ThemeContext
} from 'src/providers/theme/themeContext.ts'

const DARK_QUERY = '(prefers-color-scheme: dark)'

const isTheme = (value: unknown): value is Theme => value === 'light' || value === 'dark' || value === 'system'

const readStoredTheme = (): Theme => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    return isTheme(stored) ? stored : 'system'
  } catch {
    return 'system'
  }
}

const getSystemTheme = (): ResolvedTheme => (window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light')

// Prevents every element from animating its colors while the theme switches
const disableTransitionsTemporarily = () => {
  const style = document.createElement('style')
  style.appendChild(document.createTextNode('*,*::before,*::after{transition:none!important}'))
  document.head.appendChild(style)

  return () => {
    void window.getComputedStyle(document.body).opacity
    requestAnimationFrame(() => style.remove())
  }
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(readStoredTheme)
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme)

  const resolvedTheme: ResolvedTheme = theme === 'system' ? systemTheme : theme

  // Layout effect → applied before the browser paints, so no wrong-theme flash
  useLayoutEffect(() => {
    const restoreTransitions = disableTransitionsTemporarily()
    const root = document.documentElement

    root.setAttribute('data-theme', resolvedTheme)
    root.style.colorScheme = resolvedTheme

    restoreTransitions()
  }, [resolvedTheme])

  // Follow OS theme changes while in "system" mode
  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY)
    const onChange = (event: MediaQueryListEvent) => setSystemTheme(event.matches ? 'dark' : 'light')

    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  // Keep all open tabs in sync
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY) setThemeState(isTheme(event.newValue) ? event.newValue : 'system')
    }

    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // Storage unavailable (private mode / quota) — theme still applies for this session
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [resolvedTheme, setTheme])

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme]
  )

  return <ThemeContext value={value}>{children}</ThemeContext>
}
