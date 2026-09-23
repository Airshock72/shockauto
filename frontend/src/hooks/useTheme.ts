import { useContext } from 'react'
import { ThemeContext, type ThemeContextValue } from 'src/providers/theme/themeContext.ts'

const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

export default useTheme
