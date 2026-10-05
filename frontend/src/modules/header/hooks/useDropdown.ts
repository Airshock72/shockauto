import type { KeyboardEvent } from 'react'
import { useCallback, useEffect, useRef } from 'react'
import { useDropdownReducer } from 'src/modules/header/store/dropdown.ts'

const menuItemSelector = '[role="menuitem"]'

const useDropdown = () => {
  const [state, dispatch] = useDropdownReducer()
  const { isOpen } = state
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const close = useCallback((restoreFocus = false) => {
    dispatch({ type: 'SET_OPEN', payload: false })
    if (restoreFocus) triggerRef.current?.focus()
  }, [dispatch])

  const toggle = () => dispatch({ type: 'SET_OPEN', payload: !isOpen })

  useEffect(() => {
    if (!isOpen) return

    menuRef.current?.querySelector<HTMLElement>(menuItemSelector)?.focus()

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close()
    }
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') close(true)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, close])

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Tab') {
      close()
      return
    }

    const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(menuItemSelector))
    const current = items.indexOf(document.activeElement as HTMLElement)
    const nextIndex: Record<string, number> = {
      ArrowDown: (current + 1) % items.length,
      ArrowUp: (current - 1 + items.length) % items.length,
      Home: 0,
      End: items.length - 1
    }

    if (event.key in nextIndex) {
      event.preventDefault()
      items[nextIndex[event.key]]?.focus()
    }
  }

  return { isOpen, toggle, close, rootRef, triggerRef, menuRef, handleMenuKeyDown }
}

export default useDropdown
