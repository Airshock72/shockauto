import { type AnimationEvent, type MouseEvent, useEffect, useEffectEvent, useId, useRef } from 'react'
import { useModalReducer } from 'src/core/store/modals/modal.ts'
import { getInitialFocusTarget, modalPanelOutAnimation, trapFocus } from 'src/core/helpers/modal.ts'

interface UseModalParams {
  readonly isOpen: boolean
  readonly preventClose: boolean
  readonly onClose: () => void
  readonly onAfterClose?: () => void
}

const useModal = ({ isOpen, preventClose, onClose, onAfterClose }: UseModalParams) => {
  const [state, dispatch] = useModalReducer()
  const { isMounted } = state
  const panelRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  if (isOpen && !isMounted) dispatch({ type: 'SET_MOUNTED', payload: true })

  const requestClose = () => {
    if (isOpen && !preventClose) onClose()
  }

  const handleKeyDown = useEffectEvent((event: KeyboardEvent) => {
    const panel = panelRef.current
    if (!panel) return

    if (event.key === 'Escape') requestClose()
    if (event.key === 'Tab') trapFocus(event, panel)
  })

  useEffect(() => {
    if (!isMounted) return

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    if (panelRef.current) getInitialFocusTarget(panelRef.current).focus()

    const onKeyDown = (event: KeyboardEvent) => handleKeyDown(event)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKeyDown)
      previousFocus?.focus()
    }
  }, [isMounted])

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) requestClose()
  }

  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (isOpen || event.target !== event.currentTarget || event.animationName !== modalPanelOutAnimation) return

    dispatch({ type: 'SET_MOUNTED', payload: false })
    onAfterClose?.()
  }

  return {
    isMounted,
    panelRef,
    titleId,
    descriptionId,
    requestClose,
    handleBackdropClick,
    handleAnimationEnd
  }
}

export default useModal
