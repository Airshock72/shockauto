import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import useCurrentUser from 'src/core/hooks/useCurrentUser.ts'
import useTheme from 'src/core/hooks/useTheme.ts'
import useLogout from 'src/modules/header/hooks/useLogout.ts'
import useMenuReveal from 'src/modules/header/hooks/useMenuReveal.ts'
import { useMobileMenuReducer } from 'src/modules/header/store/mobileMenu.ts'

const useMobileMenu = () => {
  const { t } = useTranslation()
  const user = useCurrentUser()
  const logout = useLogout()
  const { resolvedTheme } = useTheme()
  const [state, dispatch] = useMobileMenuReducer()
  const { isOpen } = state
  const panelRef = useRef<HTMLElement>(null)
  useMenuReveal(panelRef, isOpen, 'top center')

  const close = () => dispatch({ type: 'SET_OPEN', payload: false })
  const toggle = () => dispatch({ type: 'SET_OPEN', payload: !isOpen })

  useEffect(() => {
    if (!isOpen) return

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dispatch({ type: 'SET_OPEN', payload: false })
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, dispatch])

  return {
    t,
    user,
    logout,
    resolvedTheme,
    isOpen,
    panelRef,
    close,
    toggle
  }
}

export default useMobileMenu
