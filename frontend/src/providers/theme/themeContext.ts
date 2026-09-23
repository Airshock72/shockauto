import { createContext } from 'react'

export type Theme = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

export interface ThemeContextValue {
  /** User preference, persisted in localStorage */
  theme: Theme
  /** Theme actually applied to the document */
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const THEME_STORAGE_KEY = 'theme'

export const ThemeContext = createContext<ThemeContextValue | null>(null)
